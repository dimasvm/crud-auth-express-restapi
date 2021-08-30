exports.allAccess = (req, res) => {
  res.status(200).send('public content')
}

exports.userBoard = (req, res) => {
  res.send('user content')
}

exports.adminBoard = (req, res) => {
  res.send('admin content')
}

exports.moderatorBoard = (req, res) => {
  res.send('moderator content')
}