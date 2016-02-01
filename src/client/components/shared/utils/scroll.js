export function scrollToTop() {
  window.scrollTo(0, 0)
}

export function scrollIntoView(id) {
   const node = document.getElementById(id)

   if (!!node && node.scrollIntoView) {
       node.scrollIntoView({ block: 'end', behavior: 'smooth' })
   }
}
