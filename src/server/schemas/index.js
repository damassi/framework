/**
 * DAM schemas go here. See Assignment Desk for an advanced example of what can be done
 * related to inverse properties and schema manipulation.
 *
 * NOTE: In the future, this can be used for building out schema-driven UI, since we now
 * have access to the schemas after the fetch.
 */

import dam from 'ape-dam-entity-client'

export default async function getSchema() {
  /* eslint no-unused-vars: 0 */

  try {
    const {
      title
    } = await dam.getSchema()

    const schemaTypes = {
      testEntityType: {},
      title: {},
    }

    return schemaTypes
  } catch (error) {
    throw new Error(
      '(server/schemas/index.js) \n' +
      error
    )
  }
}
