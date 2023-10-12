'use strict';

import { Request, Response } from 'express';

export type Controller = (req: Request, res: Response) => void;

export interface UpdatedFields {
  title?: string;
  isOpened?: boolean;
  isImportant?: boolean;
}
