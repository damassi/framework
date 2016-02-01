/**
 * Update form data within a resource, when making changes and prior to save. Form data
 * flows through the system and is used in a variety of ways, from assembling portions
 * of forms to validation to normalization.
 */

export default function initialize(resourceKey, resourceActionTypes) {
  return function updateFormAction(form) {
    return {
      type: resourceActionTypes.UPDATE_FORM,
      payload: {
        form
      }
    }
  }
}
