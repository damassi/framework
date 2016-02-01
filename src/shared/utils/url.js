
export function member(resourceKey, providerId) {
  return `/${resourceKey}/${providerId}`
}

export function collection(resourceKey) {
  return `/${resourceKey}`
}
