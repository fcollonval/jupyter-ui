/*
 * Copyright (c) 2022-2023 Datalayer Inc. All rights reserved.
 *
 * MIT License
 */

/**
 * A class to handle requests to /api/status
 */
export class Status {
  /**
   * Get the status
   */
  get(): any {
    return {};
  }
}

/**
 * A namespace for Status statics.
 */
export namespace Status {
  /**
   * The url for the status service.
   */
  export const STATUS_SERVICE_URL = '/api/status';
}
