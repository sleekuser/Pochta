const CrudInquirer = require('../crud-inquirer')
const inquirer = require('inquirer')
const chalk = require('chalk')
const validator = require('validator')
const _ = require('lodash')

const Enums = require('../../enums')
const ConnectionType = Enums.ConnectionType
const OptionType = Enums.OptionType

class ConnectionInquirer extends CrudInquirer {
  constructor() {
    super('connection', [OptionType.View, OptionType.Edit, OptionType.Delete, OptionType.Test, OptionType.Sync])
  }

  // selection type
  askConnectionTypeSelection() {
    const question = [
      {
        name: 'type',
        type: 'list',
        message: 'Which image hosting provider you would like to add?',
        choices: _.map(ConnectionType.enums, (enm) => {
          return {
            name: enm.key,
            value: enm
          }
        })
      }
    ]

    return inquirer.prompt(question)
  }

  // setup
  async askSetupQuestions(conn) {

    let type = conn && conn.type && ConnectionType.get(conn.type)
    if (!type) {
      let choice = await this.askConnectionTypeSelection()
      type = choice.type
      conn = {type: type.key.toLowerCase()}
    }

    let promise, syncTypes

    if (type) {
      switch (type) {
        case ConnectionType.Redmine:
          promise = this.askRedmineQuestions(conn)
          break
      }
    }

    // get answers
    let answers = await promise
    answers.type = conn.type
    return answers
  }

  // Redmine
  askRedmineQuestions(conn) {
    const questions = [
      {
        name: 'label',
        type: 'input',
        message: `Enter a label ${chalk.gray('(optional)')}:`,
        default: conn && conn.label
      },
      {
        name: 'config.baseURL',
        type: 'input',
        message: 'Enter Redmine url:',
        validate: baseURL => validator.isURL(baseURL, { require_protocol: true }) || 'Enter a valid url. Must include a valid protocol i.e. http, https',
        default: conn && conn.baseURL
      },
      {
        name: 'config.apiKey',
        type: 'input',
        message: 'Enter the api key:',
        validate: apiKey => !validator.isEmpty(apiKey, { ignore_whitespace: true }) || 'Enter a valid api key',
        default: conn && conn.apiKey
      }
    ]
    return inquirer.prompt(questions)
  }
}

module.exports = ConnectionInquirer
