/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/auth/login',
    tokens: [{"old":"/api/auth/login","type":0,"val":"api","end":""},{"old":"/api/auth/login","type":0,"val":"auth","end":""},{"old":"/api/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/api/auth/logout',
    tokens: [{"old":"/api/auth/logout","type":0,"val":"api","end":""},{"old":"/api/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/auth/me',
    tokens: [{"old":"/api/auth/me","type":0,"val":"api","end":""},{"old":"/api/auth/me","type":0,"val":"auth","end":""},{"old":"/api/auth/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.me']['types'],
  },
  'employees.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/employees',
    tokens: [{"old":"/api/employees","type":0,"val":"api","end":""},{"old":"/api/employees","type":0,"val":"employees","end":""}],
    types: placeholder as Registry['employees.index']['types'],
  },
  'accidents.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/accidents',
    tokens: [{"old":"/api/accidents","type":0,"val":"api","end":""},{"old":"/api/accidents","type":0,"val":"accidents","end":""}],
    types: placeholder as Registry['accidents.index']['types'],
  },
  'accidents.store': {
    methods: ["POST"],
    pattern: '/api/accidents',
    tokens: [{"old":"/api/accidents","type":0,"val":"api","end":""},{"old":"/api/accidents","type":0,"val":"accidents","end":""}],
    types: placeholder as Registry['accidents.store']['types'],
  },
  'exports.excel': {
    methods: ["GET","HEAD"],
    pattern: '/api/exports/excel',
    tokens: [{"old":"/api/exports/excel","type":0,"val":"api","end":""},{"old":"/api/exports/excel","type":0,"val":"exports","end":""},{"old":"/api/exports/excel","type":0,"val":"excel","end":""}],
    types: placeholder as Registry['exports.excel']['types'],
  },
  'exports.pdf': {
    methods: ["GET","HEAD"],
    pattern: '/api/exports/pdf',
    tokens: [{"old":"/api/exports/pdf","type":0,"val":"api","end":""},{"old":"/api/exports/pdf","type":0,"val":"exports","end":""},{"old":"/api/exports/pdf","type":0,"val":"pdf","end":""}],
    types: placeholder as Registry['exports.pdf']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
