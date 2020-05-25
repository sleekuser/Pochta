const CrudInquirer = require('../../../crud-inquirer')
const inquirer = require('inquirer')
const chalk = require('chalk')

class ImageKitInquirer extends CrudInquirer {
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
        name: 'config.publicKey',
        type: 'input',
        message: 'Enter the public key:',
        validate: key => {
          return !validator.isEmpty(key, { ignore_whitespace: true }) || 'Enter a valid public key'
        },
        default: host && host.config && host.config.publicKey
      },
      {
        name: 'config.privateKey',
        type: 'input',
        message: 'Enter the private key:',
        validate: key => {
          return !validator.isEmpty(key, { ignore_whitespace: true }) || 'Enter a valid private key'
        },
        default: host && host.config && host.config.privateKey
      },
      {
        name: 'config.id',
        type: 'input',
        message: 'Enter ImageKit id:',
        validate: key => {
          return !validator.isEmpty(key, { ignore_whitespace: true }) || 'Enter a valid ImageKit id'
        },
        default: host && host.config && host.config.id
      }
    ]
    return inquirer.prompt(questions)
  }
}

module.exports = ImageKitInquirer
