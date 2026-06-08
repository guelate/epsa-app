import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'employees.index': { paramsTuple?: []; params?: {} }
    'accidents.index': { paramsTuple?: []; params?: {} }
    'accidents.store': { paramsTuple?: []; params?: {} }
    'exports.excel': { paramsTuple?: []; params?: {} }
    'exports.pdf': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'accidents.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'employees.index': { paramsTuple?: []; params?: {} }
    'accidents.index': { paramsTuple?: []; params?: {} }
    'exports.excel': { paramsTuple?: []; params?: {} }
    'exports.pdf': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'employees.index': { paramsTuple?: []; params?: {} }
    'accidents.index': { paramsTuple?: []; params?: {} }
    'exports.excel': { paramsTuple?: []; params?: {} }
    'exports.pdf': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}