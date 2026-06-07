/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    logout: typeof routes['auth.logout']
    me: typeof routes['auth.me']
  }
  employees: {
    index: typeof routes['employees.index']
  }
  accidents: {
    index: typeof routes['accidents.index']
    store: typeof routes['accidents.store']
  }
  exports: {
    excel: typeof routes['exports.excel']
    pdf: typeof routes['exports.pdf']
  }
}
