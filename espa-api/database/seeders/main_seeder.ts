import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Employee from '#models/employee'
import Accident from '#models/accident'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      email: 'admin@epsa.com',
      password: 'epsa',
      fullName: 'Gilles Clément',
    })

    const employees = await Employee.createMany([
      { firstName: 'Corentin', lastName: 'Scialpi', email: 'corentin.scialpi@epsa.com', position: 'Dev Fullstack', contractType: 'CDI', salary: 3800, status: 'Actif', hiredAt: DateTime.fromISO('2021-03-15') },
      { firstName: 'Alicia', lastName: 'Liegl', email: 'alicia.liegl@epsa.com', position: 'RH', contractType: 'CDI', salary: 4200, status: 'Actif', hiredAt: DateTime.fromISO('2022-06-01') },
      { firstName: 'Karim', lastName: 'Dubois', email: 'karim.dubois@epsa.com', position: 'Comptable', contractType: 'CDD', salary: 2900, status: 'En congé', hiredAt: DateTime.fromISO('2023-09-01') },
      { firstName: 'Alice', lastName: 'Moreau', email: 'alice.moreau@epsa.com', position: 'Designer', contractType: 'CDI', salary: 3400, status: 'Actif', hiredAt: DateTime.fromISO('2020-01-10') },
      { firstName: 'Pierre', lastName: 'Garnier', email: 'pierre.garnier@epsa.com', position: 'Dev Fullstack', contractType: 'CDI', salary: 4800, status: 'Actif', hiredAt: DateTime.fromISO('2019-05-20') },
    ])

    await Accident.createMany([
      { employeeId: employees[0].id, accidentDate: DateTime.fromISO('2025-05-12'), accidentTime: '09:30', type: 'Lieu de travail', location: 'Entrepôt Lyon', description: 'Chute sur sol glissant lors du déchargement.', witness: 'Jean Dupont', status: 'En attente' },
      { employeeId: employees[2].id, accidentDate: DateTime.fromISO('2025-05-12'), accidentTime: '08:15', type: 'Trajet', location: 'Paris 11e', description: 'Collision à vélo sur le trajet domicile-bureau.', witness: null, status: 'En attente' },
      { employeeId: employees[1].id, accidentDate: DateTime.fromISO('2025-04-03'), accidentTime: '14:00', type: 'Trajet', location: 'Paris 8e', description: 'Chute dans le métro.', witness: null, status: 'Envoyé CPAM' },
      { employeeId: employees[3].id, accidentDate: DateTime.fromISO('2025-03-18'), accidentTime: '11:00', type: 'Lieu de travail', location: 'Bureau Paris', description: 'Malaise au bureau, chute de chaise.', witness: 'Sophie Laurent', status: 'Reconnu' },
      { employeeId: employees[4].id, accidentDate: DateTime.fromISO('2025-02-02'), accidentTime: '07:45', type: 'Lieu de travail', location: 'Chantier Bordeaux', description: 'Blessure à la main sur chantier.', witness: 'Marc Lévy', status: 'Contesté' },
    ])
  }
}