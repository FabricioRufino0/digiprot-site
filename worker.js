export default {
  fetch(request, env) {
    const url = new URL(request.url)

    if (url.hostname === 'www.digiprot.com.br') {
      url.hostname = 'digiprot.com.br'
      url.protocol = 'https:'
      url.port = ''
      return Response.redirect(url.toString(), 301)
    }

    return env.ASSETS.fetch(request)
  },
}
