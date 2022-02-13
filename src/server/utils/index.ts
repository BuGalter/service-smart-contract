import { v4 as uuidv4, } from 'uuid';
import { Boom, } from '@hapi/boom';

export function getUUID(): string {
  return uuidv4();
}

export function output(res?: object | null): object {
  return {
    ok: true,
    result: res,
  };
}

export function error(code: number, msg: string, data: object): Boom {
  return new Boom(msg, {
    data: {
      code,
      data,
      api: true,
    },
    statusCode: Math.floor(code / 1000),
  });
}
