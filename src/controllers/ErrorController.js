module.exports = {
    notFound(req, res) {
        const roomId = req.params.room;

        if (roomId == 404) {
            res.render("error-screen", {
                error: "not-found",
                title: "Sala não encontrada",
                roomId: "",
            });
        } else {
            res.render("error-screen", {
                error: "not-found",
                title: "Sala não encontrada",
                roomId: roomId,
            });
        }
    },
    wrongPass(req, res) {
        const roomId = req.params.room;

        res.render("error-screen", {
            error: "wrong-pass",
            title: "Senha incorreta",
            roomId: roomId,
        });
    },
};
