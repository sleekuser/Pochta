const CrudInquirer = require('../../../crud-inquirer')
const inquirer = require('inquirer')
const chalk = require('chalk')

class CloudinaryInquirer extends CrudInquirer {
  constructor() {
    super('host')
  }

  // setup
  async askSetupQuestions(host) {
    const questions = [
      {
        name: 'label',
        type: 'input',
        message: `Enter a label ${chalk.gray('(optional)')}:`,
        default: host && host.label
      },
      {
        name: 'config.cloudName',
        type: 'input',
        message: 'Enter the cloud name:',
        validate: key => {
          return !validator.isEmpty(key, { ignore_whitespace: true }) || 'Enter a valid cloud name'
        },
        default: host && host.config && host.config.cloudName
      },
      {
        name: 'config.apiKey',
        type: 'input',
        message: 'Enter the api key:',
        validate: key => {
          return !validator.isEmpty(key, { ignore_whitespace: true }) || 'Enter a valid api key'
        },
        default: host && host.config && host.config.apiKey
      },
      {
        name: 'config.apiSecret',
        type: 'input',
        message: 'Enter the api secret:',
        validate: key => {
          return !validator.isEmpty(key, { ignore_whitespace: true }) || 'Enter a valid api secret'
        },
        default: host && host.config && host.config.apiSecret
      }
    ]
    return inquirer.prompt(questions)
  }
}

module.exports = CloudinaryInquirer
