require('dotenv').config({path:'variables.env'});
const mongoose = require('mongoose');
const express = require('express');
const {Schema} = require("mongoose");
const app = express();
const router = express.Router();
const { MongoClient} = require('mongodb');

const client = new MongoClient(process.env.DATABASE_URL);



// async function run() {
//     try {
//         await client.connect();
//         console.log('Connected to the database...');
//         const db = client.db("users");
//         const coll = db.collection("professionals");
//
//         const professional = {
//             professionalName: "Sparkle Nova",
//             base64Image: "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",
//             nameLink: {
//                 firstName: "Sparkles",
//                 url: "https://www.byui.edu"
//             },
//             workDescription1: "Loves strolls on the beach",
//             workDescription2: "Eats in the dark",
//             linkTitleText: "This is a link",
//             linkedInLink: {
//                 text: "Lets click this here",
//                 link: "https://www.byui.edu"
//             },
//             gitHubLink: {
//                 text: "How about clicking this",
//                 link: "https://www.byui.edu"
//             }
//         }
//         // new Professional(professional).save().then(() => console.log('Jobs Done'));
//         const result = await coll.insertOne(professional);
//
//         console.log(result.insertedId);
//
//     } finally {
//         await client.close();
//     }
// }

async function run() {
    try {
        // await client.connect();
        // const db = client.db('users');
        // const coll = db.collection('professionals');
        // const cursor = coll.find();
        // await cursor.forEach(console.log);

        app.get('/professional', async (req, res) => {
            await client.connect();
            const sendInfo = await processIt();
            function processIt(data) {
                const db = client.db('users');

            const coll = db.collection('professionals');
            const cursor = coll.find();
            return cursor.forEach(console.log);
        }
            res.json(sendInfo);
        })

    } finally {
        await client.close();
    }
}
run().catch(console.dir);

//Get a connection with MongoDB
mongoose.connect(process.env.DATABASE_URL).then(() => console.log("MongoDB connected"));

//Turn the req.body into usable information
app.use(express.json());


//Professional Model
// const professionalSchema = new mongoose.Schema({
//     professionalName: String,
//     base64Image: String,
//     nameLink: {
//         firstName: String,
//         url: String
//     },
//     workDescription1: String,
//     workDescription2: String,
//     linkTitleText: String,
//     linkedInLink: {
//         text: String,
//         link: String
//     },
//     gitHubLink: {
//         text: String,
//         link: String
//     }
// })

// Creating professional object
// const Professional = mongoose.model('Professional', professionalSchema);
//
// // Grab Professionals
// app.get('/professional',(req, res) => {
//     try {
//         console.log('uploading professional')
//         let professional = {
//             professionalName: "Sparkle Nova",
//             base64Image: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwQEBAQFBQUFBQcHBgYHBwsICQgJCAsRCwwLCwwLEQ8SDw4PEg8bFRMTFRsfGhkaHyYiIiYwLTA+PlQBAwMDAwMDBAQEBAUFBQUFBwcGBgcHCwgJCAkICxELDAsLDAsRDxIPDg8SDxsVExMVGx8aGRofJiIiJjAtMD4+VP/CABEIAMoAnAMBIgACEQEDEQH/xAAdAAACAgMBAQEAAAAAAAAAAAAGBwUIAgMEAQAJ/9oACAEBAAAAAPyvxxy6enblL9MFL8NtrSIVW2OUSUQ/uvLp3zF7bToSGZUSCOav61sQoEWj/dfvUQ3SsCSmxEMQvZG1ZXFg07X5WReOUkSN80uyeBInZA14F9RVipyvyg06+jr2zdq3SzSJTs2wkhIhlP0ajU/D/dG7qIGa5XkxEd22acIdM1srAra68eXm6XmzJqO8nDfnnYBcrYkqQD1R4dmvqnSUvYbVLIEpPHkAKBiVOGqhcOersJCY7JmkYdBcxWHDwvJTQdpzr986TdiyUgxmOwooNtJPK0xo4P011/dPY0RgfePbY9+/mIzbH27EtlHhulHXyds4TyxDyzl4bTpDktF6kWNQtYUd2e7Z4zMCicGv0XsqLl8yKJBhoGolF9/uySZ521sAZzt1utYzGk/PouqNG9v2Us0mYz4xSWYuzx4M1bLoiprXut2zLZkznofxaxY1pWvxthDyAzTpY1n9y3+T1om2HVnnrBWObZRVhjhNbVxWL3LLPe1rUy+ra+WabAI7EL2vSyrT779nPmrocZmxjRmPPjqMKq1Iqquf2fxCbH5+322eBtmmx31vrsBota11+9lj5lsMxNHW4ZJnT3Yq6hrJDAlcvt5yzGOanZIy3OxiqQ21uQqjQgjXH4rcjFYRoelRubGhdL9FUk8mUQO1t6LDWKZZoR9hIXzZPNyckm6po9GQ1cCq6lmTnvlemaJJKVl93dyfn8h0jH10Z36IWKn+rb2ys7LdEnuwlfzjr+kdf//EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAKAgIQAxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//xAAuEAABBAICAgECBQMFAAAAAAABAgMEBQAGBxESEyEIEBQVIjEyIyQlFhczNUH/2gAIAQEAAQUAKk9dj7J/cfsz8Z5qOeIIr6uTMF5x7t2vluqmNKkVExLEmpmRmfpU80w5YPq5Y7FZwWknkq7B99737H1BLwAzofZP7j9m/jKmosLqfxh9J5frtY46440lj8iHItpT8Spk61xvwbUUeqcxccVz+s8F6NI1ZE1pSG+WR/juBh3yNcjt+9SA5OUlL3X3TiR3lTU/i1cLUsCrN3yVFalPSpOxU9BTxK6utFUzFbWbHKvZD9XYbNskzQZNNk+kkvxeX2VNQfp/b7365HT1/wDztVASLUxVyPBedHE/yjJHdfYIafqNzfrYGiyLDZ7K5eixIFnaobmb1bERqdEhO8RJsVibYlE6khsRCnlHg6r3ml4x0mz0rk+3T25sHwbMdvvkKcw4w2VlTgGNEpUhTlg9xvcV9Y/G2h6z3Vc5Js9jrYd1W39v7arZdkK5Oj2zD7D7TbCqi59Z37UKyycu4D7S9lBSZEX3PWDCVOeWAFR8sQoDGwfKCkMGgsFMq1Wx85cWel2Sqen338x2n2N2yWiv4tnmXCmLTNrbCyUwqtv49pm9xXIE3aU+AgxBIyQ+XABgAGBJJSD3Da8nGU/1IKD5ai4VSK2Z29JsXQvdP8gFo/FNcWWorbepl9w76aphur2df43kFxtbe1R2THoK1xbUpvzHmOv/ABJOI+VQB3kZlJdht+B1XpDkBz1LS4HDPQtcukrfxEavqXmWNJfM9jc21Zq0VUtze0Fis2h1TMfXWWTELvSfEYPjPgZHPZhOJSIAeeXAYkgUkpUZ+DJS+Y6/gxFvuVsiPVMUVpWShoLzLL28ww1ZVFZT1KuXWH1o2sdsa91+Xdkp6wfBUk+UMH2U9Z7nGnodUzG3nWUihuosxNPKaUutAfyBXDw2HY9Q13KblTQZ0/UnoFg/vylRY9ZHk7GeYbRL1NtQHqokpFSwErHXWEDG0+zK9kKfqwywm2fdtJkOIt0bHURtPq6G6cWvRlu2K5FW/Fp9zN3bXvD/ABjC2scOQNyo7jlRlz/a3SG4aU8jUbsyFtrKEioAFS2QMfDC0nIJAcgthEvyLgiUsZ/I9FXRDLiOyTR13cnibRZZSvXW0MbVwoidIoeOGY69Vrm4kDf4LJ0vWWAXp8J1+v5doY9ZNrkparQej1iUDEu9OQ3e5EJjzyBFd6g0q3C7UIjsafPdTtXHu8VgKZ0S2r6W9Ymn8vgv5CKGRyo8UaRrlel9qpS/4cy1Me2b2mvkUFgMAISAVYAhGRf5V4/RUMqUqohhadrjgVM+UirpePLdmWxpHLWyRdncuErvqi3Km4ktLmcjrB16qWmA9CnVP5zyztrVbN5G5CejbBg+UDB+pULxXlGQ63VsHKz9A2N/yQ6xGfsKbSbFcWl45p4LNzDaCqmSWVVr4Wedthcrq2onAVsB9cat5Jv37mx5GBd2TEnPjEfKUnrNKkB1qoQPGG0fHYKqS7HU9Q65msc5xK5PGf1M0Niu82KvnPwnHFr14Lcc3y3i7RfU9LBh1vI90/7dmUpU7cEe/ZMA7zxGN/wSfmiszWT6GW08zVNIcRyM1YWcSTq7hfgaGX0aJwDqlhJhcbM6kuijOuHYLg1Fbs1jZ1p1S7dl63ubhWq8Bdt7zp2/wfv8YlQGBYAbT7Dot7IqnKGziyI75juOP1FJaNVWqQpStXq2qZutrZM1UWpmFFjXWUCwv6KTZxammVrOsbq8lUiwPnsU0ly0wYAMONoK1Qovka+C5mqPLJhRTIFTr631V+tNwRAjRII1FwW0tMeM5kqniWCOXo50h6LPba12+V2h897S257vv8YB5mDAJFZV+eVlWUZW14Q7RBRypZKSiI8WbRc5LvGteuPUMEpIHY+rDU2No4QhthjVb9X6HV+W0QB/afeBFLi62AVGnrR1XV6FZErCjKlKGnNfXGdTTVqHkyNKiS1UsBEKGhGIOc4SUQ+GpbforthPaXnerKH2mL9mUFxdPAKjVQMrovgmA0Uivjl1MOrPnR15ayhWtgQnfYWP2SBiRn1cW6KrgS8ARmxr6yQsJhsABr7UVW5KcqtfUhFVRPKMDXFqFdQKSYNQ0gQq0JysrkJyE0E5WdjIznwhYxJ+PrNrlWHDOxnp/Z3AEz1j/TTQHhkRkyJGm6/5Ci1MOogaohkQaBCVN0yUJYrkpMKH3kSEhAYjdZFa8ERyvG3CFIX2PqHq13PEOyL/ALnbHfBu1Pr1htZ8M1aEZMzQdXddboteDKGqcFMauPmmF0GoA7jxPHGGQA0woltJTkcHp1RSuO95DZYCLXXNicCpW4uf0bx0mhaH6M0EAyOOEI9EFtHqjoR02hHfgjppCMYQjuMhHTCEetCU9sJTklCfGIlPa0j1bKkCft//ABXP/WMgev8A/8QARBAAAgEDAgMFBAULAgQHAAAAAQIDAAQREiEFMVETIkFhcRAykaEGICNCgRQkU2Jyc5KisbLBM1IHFkOCVGN0k8LR0v/aAAgBAQAGPwD2/h7OWdq33rIpvyeM3Eir3o1GQgbYF2OAMnkPE1q4hwu4gVnwHeNlXJGfvgGgDC5MqOEwp7+OenrSP2ErKQSMLk4Bxkio5uydoSF+00kAatwG6GvpX/6qx/skrmfeFD9qpCfu8HvP74qm/eUeZqTPi7H5/XiseH2txeXMx7kECF5G/AcgPEmouJ/S+7gsEIDNaQxpczDPg88mVT0UUZuA8H4dC8AkeCabZYyg+0nklOWwg958k/dWuP8AErl7m64ZYMAs8i6DNJJlgIYeShgudPxq4mvLNbKGXiHbKC+9vZwQa7hiT46pFXA5mor7jdr2svE5pHtIpjmSCB91RR4yv8F5muG8JhgtrcW5kuXhSHTbodWgICO8zdZK+kqOjxGae0cROQ2AqsMq3itDPUUu/wB41eH/AG8GuvnLDU37016mvDfJ/mP1laZjHEWxkDdv2atD2cdsl23aR20ZPaTqvOSR+fZjqefhTyTziLhthqWKGI4Ej+LKOZPQ+Ao2N5Cts17F+UXaITpgtI9o7YfrE7v8KsbUoqxd64ZAMZknXQq46JF82phddjDw+2RXmdgNCpE2od3xJb3V8TU3F73Tb4twbW1wPsRJ7mrO5Kgg+ZqG4uIMIEktZU3I1WzKo9AFk/Fsmo7q17jhXV4zyfQcGu0jhZSpGtD4YpAQfeOxrirdODzfOaKpv3rUaT93/k0Wt00dVHL1HtFajyFLJIA4XkDyOPD0q4uJZ2Nxex6Wk8dCnGgdAeW3hVvdzAvrngh4eD7ollfeUr5AEiuHcPt17/EJobc798wocZJ8zuaitYSDI8bOirzJ5D4cqgtmKiykOkkDP2xGUf0zsKsOGXcjIt1YPJGh91rmHDHODu0iEjptVpcPiJ5UeNxnGWwO96kCriWFDMY2UvjmVOFYjzAOaj7QKQy92QdB4Hy/pUxsdMN3o1IPuOR1xuPUV9IuHX9tNFJFwrbVjcNMlS/vWqT0NJ5RrWocmA9vRRuTWleQrfn0qGAElFADVBL2Y/NYpHj/AFpZFESHHkDTs7Zh4fCkaAHHfGx+dSXhOq4ZBDEc/wCmWXBI9A3xqLh4VNT2jiHIJw8Kh1A8204rg/0iTB4l9Gbu3uJt8F4FcK5I/VFQNGQEknEqYPg4yMeW9CMkFJIgDn0o2vdGXJjboaEE+NOdKv0PRql4pBAiXqQGPtVG5TVrKH8d6kJCle0fvZxg9Dnkamwc6Q248dqJxyCj5A1JLGACGOpB/UVyrFaBsorPj4VnxNdCeZqDJ2MiE+iVNISdVxK0jehbakk5FWGKtB2mkgqyEeDrt8xV5EuBDMWUqdwY5l0yLXCY2cMtv9ipB3Ii2XPqtPEH+0gLY33IxkVHcK2HAVgehFdsvJ8ax4ZprCZ1Mht1mgc7iSMjkR1U7GpgyjC5Vv10PLV1ZeWauQDkBHwfIirg89MoX+RaYjbLH24zyrFZPIUKT45otnbSAKUNjG3ypMHZTqBq4ki2mTS4OfiBVpIviNWOjYBq2LN3Lkdnv4sOVXtsTq7C7mj/AAB2q5G/dBI9RtVleRNpaKdRjHhIO8B5ZozlQ0csR1KR47EEVM4l0BkcKzAsp/Ebg+oq8IaJgbo4KyrjZFFdqv8A3L086FDHKmrPkKGBvmvhRwMgrnFHA5DPxpD515HlQK9aDhBgksvl1FEx5BXEsZHMMm9cUnIx2187/FEzXEIQSGaCUL555CmBX/qhgQPBCEPzFW0Tg5aJG/DTVwuxUxnUh5HNXDrsGu5Ths5GMDmOfKsgeHs2rFCjq67VlIicilLx42IG1aTH92gQMYxSAnemCAFjnTUMDjICgUQsik4zg7EGuJWDaQBP20JGPdlAyPwIqLbuyjB9BRuLnRFGwAAJ7zhASFAqxvzGywzwkAeGpMZUGrjPM4/qKLHYtcTn4SEUfqAUGkGwOwoSyMqqPGmDzPnwCoWyaLbayxJXpmveCnpSisqgUuN2PgKzxK/ggbTlVc5YgeIUZJpRDeqHZsDVlPx3qOe2us5jjZHByGG4YUty6doI5ljEh2AaQYUH4VaduSsyytC69NZAb4KDXD+HgZeN5p/+w4GKlwScuv8AdVuTnvGU/GRqKs2K5nb2qQKUswAxTxs/cRW7Nfu5FLkMx1aGiVcyFvAKK4KWnja9ltYu3ijILo5G5OOnI0pboM+tKPKpniQs2irm84q9xA02sBpUYrEwPKuI8Rv1EHDobQRx3Dv2LSzg7yx+QpkWCefhi3Jjgu2jcrKoOzbVxS5Rcy2/5PONs7iZR/mo5dzM6KGz72w2DeBI8GprtMs8SjHjpHX06imGsR/arlWzsQeQxzqxz+gU/HetxSvHJqYjvAqVINYrB5EVKMbYpVBOAKy2RQkAJcfeOx+VaIkCp4nFRxDGc1BO8ZTIzg1oZRpI32prywPvHLJikF3BrKEemR5GkgECLF0xmuKxFRpeFAAf3i0NJCEYJDHTkk8t6d0QSNGpJB5SJjvKfOpOwYdlI4mhbkHQqW+IqxVmUH8li8/u0PZkmhjIFIx++lA0AvM0DJv0FNI4wAOdW9y0bC21HST41DFT/khDShMgU0bbPGxVh0IoOUBbritA28KuQudclzboMc+Zb/FM0jKxG4wwJPljypxb3BEqKwClhqDDdQeoNRW8kfYPI8mjbC7rsw/2lSwyORFRWMo7IpbJhHBB0jIHUHlzHsB9nU9aiYHGlqUg0KXC1JGh7x2qzHCHszcxOGnWb3nH+0bgiopLp0tJEAZ115+HiaCTWVpYcNWUoC0rSTygcmJ2A9AKury2jZIZ5ywBGNj44pdTUKiVjj847UesSH/7pmAWWMrqZCPmCN6kNvHdCYRp2gZleLc7Y8fGuHwC3S8d452UschUyQGI9AaUJa2Ega2Ri0toHbJZupPsG/sx4CgrMFyfE0mNxjGaXFAH1BrSTy50jRxgyagNR51wCSC1kkM0i6yqk4DdaiumtYZJo02LKCQa2RQV6UqnrSYOc4q0tLcapVtnnfyy2w/EJQmDnTrm0Nn3Rr930FXfFLyRkimAcFhkqmO6o5ZJA5Vc3DKIROphRASdMepUEYJ6LzNMOei3jHxy3+fqNQFGEneNuXkaGRS6RtimdVbcUZr7iMKTE5ChtTegAyc0LeP6R9jBnIWYOoXT12o21zxO3uU8Tko6DrpfBIrtLSdJEbkyEEGlOAQTUQBG5AriolL/AJI8iQwSr3jEkI0hyPFTjNWyy3CywoWYlubAkkDHXyq7s0fTBEEGlfA6cPmrYYzmSEAesoq+OM6eyX4RL9RxRNQzblDs46rUUsTB43AIIpAxwuKFpaTSRoM5CnGryNMs0TJMTgjrUTsuFkbQB1qO54nPcTsmNNvA2j8GJzXacNcorvqMAJKgYAC+oxSqQcinsbPUbu5QqxXcxow/uNQSW3bhVlmMwUHUdAACjzJPKuD3LRq8jIXyT3Q+shjpGxIIpGzkump8nmSTmrRMg/nEHyYt/iuKnpdsv8Chfbzo+wYoW75eAnOnp1xSNC4ZSK1ldVYubQORnBU6WHoRUaJG4SJyV79aYYAGYAGTJZsUoIJWpo7GMGePbvDGPNc867K6jnSVySHIJ3PjkVG13NB2yvq7WR9iFXYHBJ8OhNcH4S7tJNBZRRSMyGI6jlm7h3X0NMoP+mip+I3PzNWS8/t1/ljZq4m+fev7g/zkfWG1KU2YHY0NzHINmUGsHAJpVxsfGh2cZdmO5rtLqUDbOhdzQEaCOBCCR4nHU1ns1B6jamiuU1p9zfdaMN1x08OtpoXa1RpBBDcAnBHaKNYIOzKCK4VKjRTSS2kLLJGMR95M6kHToKJPM1ZjOfzk/JKkk/STSt/E5P1ABQobUpK0jICGoK6kEGl22OKymScUEUMCTSu4IZ639n0km7INd8GiXiVs/QQEdqPQxk19HYs7Jwu0HwgWtulQP+je4f8AhSovNQfj9QHFDah3aA0UDpwKU70gasIARSs6YPlUcQBGke3/AIhyyHA/5V4ov4vCVFcMgI/0rKJf4Y1Fc/Cr+Xxi4dfSZ/Aioh0Qe0DFLQx8xS4AzQ2yaAx+GKUgUnXNLvQBP1PpQmcScRNpYx+fbTAt/KpqJeWmHHwAFEV9IJifc4aUB/elqXf2qdPM0mFoYU0uV3oAx5FLgYNDI+VZODvQ0jFZrBPtRv8Awv0j4VJ/7rmD/wCdMOit/Wn9K44wxl5LWL5of80NvYkY8TUeFpe6PU0vcodz5VyAodaA8aHWhuaG/wBTjttGup0ueFzj0gvoXb5VJ6H5samOfut/Srn/AM/i8S/whf8A80PYDjO4AqM6PAGkzHyr3cVuCNq3FZxtS7Vyrl3RWMfjWMCgfChXFbN1DCaymAHmF1D5inH6qZq4/YarCP8AScUmf+AuKHsiyB79R90eFDuj4V7o+FN3Ry6V7o50O6KHdFe6K90c+lchR2FDujnR2FOMDGhv6VLgD7lTfs/5rgP7+7/vahX/xAAUEQEAAAAAAAAAAAAAAAAAAABw/9oACAECAQE/AAL/xAAUEQEAAAAAAAAAAAAAAAAAAABw/9oACAEDAQE/AAL/2Q==",
//             nameLink: {
//                 firstName: "Sparkles",
//                 url: "https://www.byui.edu"
//             },
//             workDescription1: "Loves strolls on the beach",
//             workDescription2: "Eats in the dark",
//             linkTitleText: "This is a link",
//             linkedInLink: {
//                 text: "Lets click this here",
//                 link: "https://www.byui.edu"
//             },
//             gitHubLink: {
//                 text: "How about clicking this",
//                 link: "https://www.byui.edu"
//             }
//         }
//         new Professional(professional).save().then(() => console.log('Jobs Done'));
//
//     } catch (err) {
//         res.status(500).send("THIS Failed")
//     }
// });


// app.get('/professional', (req, res) => {
//     const professional = {
//         name: 'Blurp',
//         age: 23,
//         occupation: "Programmer"
//     }
//     // res.send("I'M alive!");
//     res.json(professional);
// })


app.set('port', process.env.PORT || 3000);

// Get the server running on the right port
const server = app.listen(app.get('port'), () => console.log(`Listening on port ${server.address().port}`));