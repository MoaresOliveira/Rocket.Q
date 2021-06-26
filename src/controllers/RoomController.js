const Database = require("../db/config");

module.exports = {
    async create(req, res, vari = true) {
        const db = await Database();
        const pass = req.body.password;
        let roomId = "";
        let isRoom = true;

        while (isRoom) {
            // Gera o número da sala
            for (let i = 0; i < 6; i++) {
                roomId += Math.floor(Math.random() * 10).toString();
            }

            // Verifica se o número já existe
            const roomsExistIds = await db.all(`
                SELECT id FROM rooms;
            `);
            isRoom = roomsExistIds.some(
                (roomExistId) => roomExistId === roomId
            );
            if (!isRoom) {
                // Insere a sala no Banco
                await db.run(`
                    INSERT INTO rooms (
                        id, 
                        pass
                    ) VALUES (
                        ${parseInt(roomId)},
                        '${pass}'
                    )
                `);
            }
        }

        await db.close();

        res.redirect(`/room/${roomId}`);
        if (vari == false) {
            return roomId;
        }
    },

    async open(req, res) {
        const db = await Database();

        const roomId = req.params.room;

        const questions = await db.all(`
            SELECT * FROM questions WHERE room = ${roomId} and read = 0
        `);

        const questionsRead = await db.all(`
            SELECT * FROM questions WHERE room = ${roomId} and read = 1
        `);

        let isNoQuestions;

        if (questions.length == 0) {
            if (questionsRead.length == 0) {
                isNoQuestions = true;
            }
        }

        res.render("room", {
            roomId: roomId,
            questions: questions,
            questionsRead: questionsRead,
            isNoQuestions: isNoQuestions,
        });
    },

    async enter(req, res) {
        const db = await Database();
        const roomId = req.body.roomId;
        let isRoom = true


        if(roomId.length == 0){
            res.redirect(`/room-not-found/404`);
        }else{
            // Verifica se o número já existe
            const roomsExistIds = await db.get(`
                    SELECT id FROM rooms WHERE id = ${roomId};
                `);
            isRoom = roomsExistIds === undefined ? false : true;
            if(isRoom) {
                // Redireciona para a sala
                res.redirect(`/room/${roomId}`);
            }else{
                // Redireciona para a sala de 404
                res.redirect(`/room-not-found/${roomId}`)
            }

        }
        
    },
};
