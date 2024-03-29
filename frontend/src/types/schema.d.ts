/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/api/v1/assets/': {
    /**
     * Get a list of assets
     * @description Used for fetching a (paginated) list of assets stored in the database.
     *
     * Allows searching by arbitrary strings, sorting by date or name, adding keyword filters, and adding offset for pagination.
     */
    get: operations['get_assets_api_v1_assets__get'];
    /**
     * Create a new asset, not including initial version
     * @description Creating a new asset in the database. Does not include initial version -- followed up with POST to `/assets/{uuid}` to upload an initial version.
     */
    post: operations['new_asset_api_v1_assets__post'];
  };
  '/api/v1/assets/{uuid}': {
    /**
     * Get info about a specific asset
     * @description Based on `uuid`, fetches information on a specific asset.
     */
    get: operations['get_asset_info_api_v1_assets__uuid__get'];
    /** Update asset metadata */
    put: operations['put_asset_api_v1_assets__uuid__put'];
  };
  '/api/v1/assets/{uuid}/versions': {
    /** Get a list of versions for a given asset */
    get: operations['get_asset_versions_api_v1_assets__uuid__versions_get'];
    /** Upload a new version for a given asset */
    post: operations['new_asset_version_api_v1_assets__uuid__versions_post'];
  };
  '/api/v1/assets/{uuid}/versions/{semver}': {
    /** Get a specific version of an asset */
    get: operations['get_version_api_v1_assets__uuid__versions__semver__get'];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** Asset */
    Asset: {
      /** Asset Name */
      asset_name: string;
      /** Keywords */
      keywords: string;
      /** Image Uri */
      image_uri: string | null;
      /**
       * Id
       * Format: uuid
       */
      id: string;
      /** Author Pennkey */
      author_pennkey: string;
    };
    /** AssetCreate */
    AssetCreate: {
      /** Asset Name */
      asset_name: string;
      /** Keywords */
      keywords: string;
      /** Image Uri */
      image_uri: string | null;
    };
    /** Body_new_asset_version_api_v1_assets__uuid__versions_post */
    Body_new_asset_version_api_v1_assets__uuid__versions_post: {
      /**
       * File
       * Format: binary
       */
      file: string;
      /**
       * Is Major
       * @default false
       */
      is_major?: boolean;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components['schemas']['ValidationError'][];
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
    /** Version */
    Version: {
      /**
       * Asset Id
       * Format: uuid
       */
      asset_id: string;
      /** File Key */
      file_key: string;
      /** Semver */
      semver: string;
      /** Author Pennkey */
      author_pennkey: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  /**
   * Get a list of assets
   * @description Used for fetching a (paginated) list of assets stored in the database.
   *
   * Allows searching by arbitrary strings, sorting by date or name, adding keyword filters, and adding offset for pagination.
   */
  get_assets_api_v1_assets__get: {
    parameters: {
      query?: {
        search?: string | null;
        keywords?: string | null;
        sort?: 'date' | 'name';
        offset?: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['Asset'][];
        };
      };
      /** @description Not found */
      404: {
        content: never;
      };
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  /**
   * Create a new asset, not including initial version
   * @description Creating a new asset in the database. Does not include initial version -- followed up with POST to `/assets/{uuid}` to upload an initial version.
   */
  new_asset_api_v1_assets__post: {
    requestBody: {
      content: {
        'application/json': components['schemas']['AssetCreate'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['Asset'];
        };
      };
      /** @description Not found */
      404: {
        content: never;
      };
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  /**
   * Get info about a specific asset
   * @description Based on `uuid`, fetches information on a specific asset.
   */
  get_asset_info_api_v1_assets__uuid__get: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['Asset'];
        };
      };
      /** @description Not found */
      404: {
        content: never;
      };
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  /** Update asset metadata */
  put_asset_api_v1_assets__uuid__put: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['AssetCreate'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': unknown;
        };
      };
      /** @description Not found */
      404: {
        content: never;
      };
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  /** Get a list of versions for a given asset */
  get_asset_versions_api_v1_assets__uuid__versions_get: {
    parameters: {
      query?: {
        sort?: 'asc' | 'desc';
        offset?: number;
      };
      path: {
        uuid: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['Version'][];
        };
      };
      /** @description Not found */
      404: {
        content: never;
      };
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  /** Upload a new version for a given asset */
  new_asset_version_api_v1_assets__uuid__versions_post: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    requestBody: {
      content: {
        'multipart/form-data': components['schemas']['Body_new_asset_version_api_v1_assets__uuid__versions_post'];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': unknown;
        };
      };
      /** @description Not found */
      404: {
        content: never;
      };
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
  /** Get a specific version of an asset */
  get_version_api_v1_assets__uuid__versions__semver__get: {
    parameters: {
      path: {
        uuid: string;
        semver: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['Version'];
        };
      };
      /** @description Not found */
      404: {
        content: never;
      };
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError'];
        };
      };
    };
  };
}
