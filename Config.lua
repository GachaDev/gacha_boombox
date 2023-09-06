Config = Config or {}
Config.framework = 'qbcore' --(qbcore/esx/custom)
Config.useItem = true
Config.itemName = 'speaker' --You need to had this item created in your config or database
Config.KeyAccessUi = 38
Config.KeyDeleteSpeaker = 194
Config.KeyToMove = 311
Config.KeyToPlaceSpeaker = 191
Config.KeyToChangeAnim = 311

Config.Translations = {
    notEnoughDistance = 'You should reserve a little more distance from the other nearby speaker.',
    helpNotify = 'Press ~INPUT_CONTEXT~ to access into the speaker, ~INPUT_FRONTEND_RRIGHT~ to delete it or ~INPUT_REPLAY_SHOWHOTKEY~ to hold boombox',
    libraryLabel = 'Your library',
    newPlaylistLabel = 'Create new Playlist',
    importPlaylistLabel = 'Import a existing Playlist',
    newPlaylist = 'New Playlist',
    playlistName = 'Playlist name',
    addSong = 'Add song',
    deletePlaylist = 'Delete Playlist',
    unkown = 'Unkown',
    titleFirstMessage = "Don't have a playlist yet?",
    secondFirstMessage = "Create a Playlist",
    holdingBoombox = 'Press ~INPUT_FRONTEND_RDOWN~ to place the speaker or ~INPUT_REPLAY_SHOWHOTKEY~ to change anim'
}