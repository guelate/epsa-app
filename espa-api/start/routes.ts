import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const AccidentsController = () => import('#controllers/accidents_controller')
const ExportsController = () => import('#controllers/exports_controller')

// Public routes
router.post('/api/auth/login', [AuthController, 'login'])

// Protected routes
router.group(() => {
  router.post('/api/auth/logout', [AuthController, 'logout'])
  router.get('/api/auth/me', [AuthController, 'me'])

  router.get('/api/accidents', [AccidentsController, 'index'])
  router.post('/api/accidents', [AccidentsController, 'store'])

  router.get('/api/exports/excel', [ExportsController, 'excel'])
  router.get('/api/exports/pdf', [ExportsController, 'pdf'])

}).use(middleware.auth({ guards: ['api'] }))