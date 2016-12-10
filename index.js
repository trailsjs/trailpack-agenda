'use strict'

const Agenda = require('agenda')
const Trailpack = require('trailpack')

/**
 * Use Agenda in your Trails Application
 * @type {AgendaTrailpack}
 *
 */
module.exports = class AgendaTrailpack extends Trailpack {

  /**
   * Ensure that config/agenda is valid
   */
  validate() {
    const config = this.app.config

    if (!config.agenda) {
      return Promise.reject(new Error('config/agenda file not found. also check config/index'))
    }
    if (!config.agenda.mongoUri) {
      return Promise.reject(new Error('config/agenda: mongoUri not defined'))
    }
    return Promise.resolve()
  }

  /**
   * Agenda configure
   */
  configure() {

  }

  /**
   * Agenda initialize with this.app.agenda
   */
  initialize() {

    let agenda = new Agenda({ db: { address: this.app.config.agenda.mongoUri } });

    return new Promise((resolve, reject)=> {

      agenda.on('ready', ()=> {

        this.app.agenda = agenda;
        resolve()
      })

      agenda.on('error', (e)=> {
        this.app.log.error('Agenda error:')
        reject(e);
      })
    })

  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

