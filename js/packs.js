const packs = {
            1: {
                titulo: "Aventura asturiana",
                descripcionCorta:"5 días explorando los Picos de Europa y sus paisajes de ensueño",
                precio: "390€",
                imagen:"images/pack1-montaña.png",
                descripcionLarga: "Embárcate en una experiencia única de 5 días explorando los Picos de Europa y los rincones más bellos de Asturias..."
            },

            3: {
                titulo: "Hacia Santiago",
                descripcionCorta:"10 días, casi 300 kms y una meta, ¡Santiago!",
                precio:"450€",
                imagen: "images/pack3-camino.png",
                descripcionLarga: "Embárcate en un emocionante viaje de 10 días recorriendo el Camino de Santiago por la Costa, una ruta que combina historia, naturaleza y vistas impresionantes al mar Cantábrico. Comenzarás tu aventura en Irún, siguiendo senderos costeros que te llevarán por acantilados, playas y pintorescos pueblos pesqueros. Cada etapa ofrece paisajes únicos: dunas de arena dorada, bosques frondosos y villas con encanto donde podrás descansar y disfrutar de la gastronomía local. Además de caminar, conocerás la cultura gallega a través de mercados tradicionales, festivales locales y visitas a iglesias y monasterios históricos. Esta ruta es ideal para los amantes del senderismo y la naturaleza, ofreciendo un equilibrio perfecto entre esfuerzo físico, paisajes inolvidables y la satisfacción de avanzar hacia la emblemática catedral de Santiago de Compostela."
            },

            4: {
                titulo: "País Vasco en caravana",
                descripcionCorta:"Recorre Euskadi y sus pueblos en autocaravana durante 8 días",
                precio:"450€",
                imagen: "images/pack4-caravana.png",
                descripcionLarga:"Descubre el País Vasco de una manera única durante 8 días recorriendo sus paisajes y pueblos en autocaravana. Este viaje te permitirá combinar libertad, confort y aventura mientras exploras ciudades vibrantes como Bilbao, con su famoso Museo Guggenheim, y San Sebastián, conocida por sus playas y su exquisita gastronomía. A lo largo de la ruta visitarás encantadores pueblos costeros, viñedos y zonas rurales donde podrás probar productos locales como el queso Idiazábal, la sidra y los pintxos tradicionales. Cada día será una nueva experiencia: senderismo por montañas y acantilados, paseos por la costa y tiempo para relajarte en playas escondidas. Esta aventura en autocaravana es ideal para quienes buscan independencia, naturaleza y cultura en un viaje completo y flexible."
            },

            2: {
                titulo: "El desafío del Teide",
                descripcionCorta:"7 días viviendo entre volcanes y playas que te dejarán boquiabierto",
                precio:"575€",
                imagen: "images/pack2-desierto.png",
                descripcionLarga: "Prepárate para 7 días de aventura en las impresionantes Islas Canarias, donde descubrirás paisajes volcánicos únicos y playas paradisíacas. Tu viaje comienza en Tenerife, con una emocionante subida al majestuoso Teide, el pico más alto de España, acompañado de guías expertos que te contarán la historia geológica y cultural del volcán. Durante la semana explorarás parques naturales, como el Parque Rural de Anaga, y senderos costeros con vistas al Atlántico que te dejarán sin aliento. También disfrutarás de las tradiciones locales, visitando pueblos con encanto y probando la gastronomía canaria: gofio, mojo y pescado fresco. Este viaje combina deporte, naturaleza y cultura insular, ofreciendo una experiencia única e inolvidable para los amantes de la aventura y la belleza natural."
            },

            5: {
                titulo: "Senderismo por Mallorca",
                descripcionCorta: "5 días de las rutas de senderismo más espectaculares de Mallorca",
                precio: "480€",
                imagen: "images/pack5-islas.png",
                descripcionLarga: "Vive 5 días de senderismo inolvidables recorriendo la Serra de Tramuntana, declarada Patrimonio de la Humanidad por la UNESCO. Esta ruta combina montañas, valles y espectaculares vistas al mar Mediterráneo, ofreciendo paisajes que parecen sacados de una postal. Cada día caminarás por senderos señalizados que atraviesan bosques de pinos, acantilados y pueblos tradicionales mallorquines, donde podrás descansar y disfrutar de la gastronomía local. Descubrirás calas escondidas, antiguos molinos de viento y caminos históricos que han conectado a las comunidades durante siglos. Este viaje es ideal para los amantes de la naturaleza, el deporte y la cultura, brindándote una experiencia completa en el corazón de Mallorca, rodeado de belleza natural y tranquilidad."
            }
        };

        const params = new URLSearchParams(window.location.search);
        const packId = params.get('pack') || '1'; // Por defecto pack 1
        // Cargar datos del pack
        const pack = packs[packId];

        // Rellenamos los elementos del HTML
        document.getElementById("titulo-pack").textContent = pack.titulo;
        document.getElementById("descripcion-corta").textContent = pack.descripcionCorta;
        document.getElementById("precio-pack").textContent = pack.precio;
        document.getElementById("imagen-pack").src = pack.imagen;
        document.getElementById("descripcion-larga-texto").textContent = pack.descripcionLarga;