import { ICell, IOutput } from '@jupyterlab/nbformat';
import OutputAdapter from '../../../components/output/OutputAdapter';
import Lumino from '../../../jupyter/lumino/Lumino';

type Props = {
  cell: ICell,
}

const OutputViewer = (props: Props) => {
  const { cell } = props;
  const outputs = cell.outputs ? (cell.outputs as IOutput[]) : undefined;
  const outputAdapter = new OutputAdapter(undefined, outputs);
  switch(cell.cell_type) {
    case 'code': {
      return (
        <>
          <Lumino>
            {outputAdapter.outputArea}
          </Lumino>
        </>
      );
    }
    default:
      return <></>
  }
}

export default OutputViewer;
