import { Kernel as JupyterKernel, KernelManager, SessionManager, KernelMessage } from '@jupyterlab/services';
import { ISessionConnection } from '@jupyterlab/services/lib/session/session';
import { UUID } from '@lumino/coreutils';

export type IKernelProps = {
  kernelManager: KernelManager;
  kernelName: string;
  kernelModel?: JupyterKernel.IModel
}

export class Kernel {
  private _kernelManager: KernelManager;
  private _kernelName: string;
  private _kernelConnection: Promise<JupyterKernel.IKernelConnection>;
  private _session: ISessionConnection;
  private _clientId: string;
  private _serverId: string;
  private _sessionId: string;
  private _info: KernelMessage.IInfoReply;

  public constructor(props: IKernelProps) {
    const { kernelManager, kernelName, kernelModel } = props;
    this._kernelManager = kernelManager;
    this._kernelName = kernelName;
    this._kernelConnection = this.requestJupyterKernel(kernelModel); // Request the effective Jupyter Kernel.
  }

  private async requestJupyterKernel(kernelModel?: JupyterKernel.IModel): Promise<JupyterKernel.IKernelConnection> {
    await this._kernelManager.ready;
    const sessionManager = new SessionManager({
      kernelManager: this._kernelManager,
      serverSettings: this._kernelManager.serverSettings, // Important, do not remove this.
      standby: 'never',
    });
    await sessionManager.ready;
    if (kernelModel) {
      console.log('Reusing a pre-existing kernel model.')
      const model = sessionManager.running().next().value;
      this._session = sessionManager.connectTo({model});
    }
    else {
      const randomName = UUID.uuid4();
      this._session = await sessionManager.startNew(
        {
          name: randomName,
          path: randomName,
          type: this._kernelName,
          kernel: {
            name: this._kernelName,
          },
        },
        {
          kernelConnectionOptions: {
            handleComms: true,
          }
        }
      );
    }
    this._info = await this._session.kernel!.info;
    this._clientId = this._session.kernel!.clientId;  
    this._serverId = this._session.kernel!.id; 
    this._sessionId = this._session.id;
    return this._session.kernel!;
  }

  get clientId(): string {
    return this._clientId;
  }

  get serverId(): string {
    return this._serverId;
  }

  get sessionId(): string {
    return this._sessionId;
  }

  get info(): KernelMessage.IInfoReply {
    return this._info;
  }

  get session(): ISessionConnection {
    return this._session;
  }

  public get connection(): Promise<JupyterKernel.IKernelConnection> {
    return this._kernelConnection;
  }

  public shutdown() {
    this._session.kernel?.shutdown();
    this.connection.then(k => k.dispose());
  }

}

export default Kernel;
