const toPublicUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl || "https://robohash.org/mail@ashallendesign.co.uk" 
})

export default toPublicUser;