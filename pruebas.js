function Registro(){
  //Variables universales
  const mongoose = require('mongoose');

  //Llamadas de cada modelo
  const estado = mongoose.model('estado');
  const preferencia = mongoose.model('preferencia');
  const votacion = mongoose.model('votacion');
  const usuario = mongoose.model('usuario');
  const politico = mongoose.model('politico');
  const estudio = mongoose.model('estudio');
  const evento = mongoose.model('evento');
  const grado_academico = mongoose.model('grado_academico');
  const lugar_estudio = mongoose.model('lugar_estudio');
  const partido = mongoose.model('partido');
  const propuesta = mongoose.model('propuesta');
  const tipo_propuesta = mongoose.model('tipo_propuesta');
  const tipo_usuario = mongoose.model('tipo_usuario');
  const zona = mongoose.model('zona');
  const solicitud_evento = mongoose.model('solicitud_evento');
  const solicitud_politico = mongoose.model('solicitud_politico');
  const solicitud_propuesta = mongoose.model('solicitud_propuesta');

  //Registro de Estados & Zonas
  /*
  //Registro de Estados de la Republica
  //Datos:
  //  name: String
  //Variables
  //  contador se usa para saber cuantos estados ha guardado
  //  ids[] guarda las id de cada uno de los estados
  //  bAdministrador es un booleano que hace que no se registren los administradores antes de instanciar administrador
  var contador = 0;
  var ids = [];
  var idGrados = [];
  const estados = ['Aguascalientes',
                   'Baja California Norte',
                   'Baja California Sur',
                   'Coahuila',
                   'Chihuahua',
                   'Colima',
                   'Campeche',
                   'Chiapas',
                   'Ciudad de México',
                   'Durango',
                   'Guerrero',
                   'Guanajuato',
                   'Hidalgo',
                   'Jalisco',
                   'Michoacán',
                   'Morelos',
                   'México',
                   'Nayarit',
                   'Nuevo León',
                   'Oaxaca',
                   'Puebla',
                   'Querétaro',
                   'Quintana Roo',
                   'Sinaloa',
                   'San Luis Potosí',
                   'Sonora',
                   'Tamaulipas',
                   'Tabasco',
                   'Tlaxcala',
                   'Veracruz',
                   'Yucatán',
                   'Zacatecas',
                   'Nacional'];

    estados.map((item) => {
      var Estado = mongoose.model('estado');
      var michoacan = new estado({ nombre: item});
      michoacan.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Estado registrado');
        }

        ids.push(michoacan._id)
        contador = contador + 1;

        if (contador == 33){
          //Registro de Zonas
          //Datos:
          //  zona: String,
          //  estados: Array de ObjectId con referencia en: 'estado'
          //Registros:
          //  Noroeste = Baja California, Baja California Sur, Chihuahua, Durango, Sinaloa, Sonora
          //  Noreste = Coahuila, Nuevo León, Tamaulipas
          //  Occidente = Colima, Jalisco, Michoacán, Nayarit
          //  Oriente = Hidalgo, Puebla, Tlaxcala, Veracruz
          //  Centronorte = Aguascalientes, Guanajuato, Querétaro, San Luis Potosí, Zacatecas
          //  Centrosur = Ciudad de México, México, Morelos
          //  Suroeste = Chiapas, Guerrero, Oaxaca
          //  Sureste = Campeche, Quintana Roo, Tabasco, Yucatán
          //  Nacional = Nacional
          //Variables
          //  Cada estado tiene una variable que guarda su id, después, son llevadas a su respectiva zona
          //  Cada zona cuando con un Array, que guarda las id de los estados que contiene

          var Aguascalientes = ids[0];
          var Baja_California_Norte = ids[1];
          var Baja_California_Sur = ids[2];
          var Coahuila = ids[3];
          var Chihuahua = ids[4];
          var Colima = ids[5];
          var Campeche = ids[6];
          var Chiapas = ids[7];
          var Ciudad_de_México = ids[8];
          var Durango = ids[9];
          var Guerrero = ids[10];
          var Guanajuato = ids[11];
          var Hidalgo = ids[12];
          var Jalisco = ids[13];
          var Michoacán = ids[14];
          var Morelos = ids[15];
          var México = ids[16];
          var Nayarit = ids[17];
          var Nuevo_León = ids[18];
          var Oaxaca = ids[19];
          var Puebla = ids[20];
          var Querétaro = ids[21];
          var Quintana_Roo = ids[22];
          var Sinaloa = ids[23];
          var San_Luis_Potosí = ids[24];
          var Sonora = ids[25];
          var Tamaulipas = ids[26];
          var Tabasco = ids[27];
          var Tlaxcala = ids[28];
          var Veracruz = ids[29];
          var Yucatán = ids[30];
          var Zacatecas = ids[31];
          var edoNacional = ids[32];

          var Noroeste = [];
          var Noreste = [];
          var Occidente = [];
          var Oriente = [];
          var Centronorte = [];
          var Centrosur = [];
          var Suroeste = [];
          var Sureste = [];
          var Nacional = [];

          Noroeste = [Baja_California_Norte, Baja_California_Sur, Chihuahua, Durango, Sinaloa, Sonora];
          Noreste = [Coahuila, Nuevo_León, Tamaulipas];
          Occidente = [Colima, Jalisco, Michoacán, Nayarit];
          Oriente = [Hidalgo, Puebla, Tlaxcala, Veracruz];
          Centronorte = [Aguascalientes, Guanajuato, Querétaro, San_Luis_Potosí, Zacatecas];
          Centrosur = [Ciudad_de_México, México, Morelos];
          Suroeste = [Chiapas, Guerrero, Oaxaca];
          Sureste = [Campeche, Quintana_Roo, Tabasco, Yucatán];
          Nacional = [edoNacional];

          var noroeste = new zona({nombre: 'Noroeste', estados: Noroeste});
          var noreste = new zona({nombre: 'Noreste', estados: Noreste});
          var occidente = new zona({nombre: 'Occidente', estados: Occidente});
          var oriente = new zona({nombre: 'Oriente', estados: Oriente});
          var centronorte = new zona({nombre: 'Centronorte', estados: Centronorte});
          var centrosur = new zona({nombre: 'Centrosur', estados: Centrosur});
          var suroeste = new zona({nombre: 'Suroeste', estados: Suroeste});
          var sureste = new zona({nombre: 'Sureste', estados: Sureste});
          var nacional = new zona({nombre: 'Nacional', estados: Nacional});

          noroeste.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Estados relacionados con Noroeste exitosamente');
            }
          });

          noreste.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Estados relacionados con Noreste exitosamente');
            }
          });

          occidente.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Estados relacionados con Occidente exitosamente');
            }
          });

          oriente.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Estados relacionados con Oriente exitosamente');
            }
          });

          centronorte.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Estados relacionados con Centronorte exitosamente');
            }
          });

          centrosur.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Estados relacionados con Centrosur exitosamente');
            }
          });

          suroeste.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Estados relacionados con Suroeste exitosamente');
            }
          });

          sureste.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Estados relacionados con Sureste exitosamente');
            }
          });

          nacional.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Estado relacionado con Nacional exitosamente');
            }
          });
        }
      });
    });
  */

  //Catálogo de Tipo de Usuario
  /*
  //Datos:
  //  tipo: String
  //Registros
  //  Registrado
  //  Moderador
  //  Administrador
  const Tipo_usuario = mongoose.model('tipo_usuario');

  var registrado = new Tipo_usuario({tipo: 'Registrado'});
  var moderador = new Tipo_usuario({tipo: 'Moderador'});
  var administrador = new Tipo_usuario({tipo: 'Administrador'});

  registrado.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Usuario Registrado registrado');
    }
  });
  moderador.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Usuario Moderador registrado');
    }
  });
  administrador.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Usuario Administrador registrado');
      //Registro de Usuarios
      //Datos:
      //  nombre: String
      //  email: String
      //  tipo_usuario: Id con referencias en tipo_usuario
      //  contrasena: String
      //  curp: String
      //  avatar: String
      //  puntos: Number
      //  localidad: String
      //  fecha_registro: {new Date ({new Date.now)
      const usuario = mongoose.model('usuario');

      const chivo = new usuario({nombre: 'Chivo12',
                                  email: '',
                                  tipo_usuario: administrador._id,
                                  contrasena: 'Hola1234',
                                  curp: 'HEGG560427MVZRRL04',
                                  avatar: 'chivo',
                                  puntos: 30,
                                  localidad: 'México'});

      const erizo = new usuario({nombre: 'Erizo21',
                                  email: 'yosafat_martinez21@hotmail.com',
                                  tipo_usuario: administrador._id,
                                  contrasena: 'Hola1234',
                                  curp: 'HEGG560427MVZRRL04',
                                  avatar: 'erizo',
                                  puntos: 50,
                                  localidad: 'México'});

      const jaiba = new usuario({nombre: 'Jaiba17',
                                  email: 'diletalvezalaautopista@gmail.com',
                                  tipo_usuario: administrador._id,
                                  contrasena: 'Hola1234',
                                  curp: 'HEGG560427MVZRRL04',
                                  avatar: 'jaiba',
                                  puntos: 40,
                                  localidad: 'México'});

      const anguila = new usuario({nombre: 'Anguila11',
                                email: 'carlitose07@gmail.com',
                                tipo_usuario: administrador._id,
                                contrasena: 'Hola1234',
                                curp: 'HEGG560427MVZRRL04',
                                avatar: 'anguila',
                                puntos: 50,
                                localidad: 'México'});

      chivo.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Chivo registrado');
        }
      });
      erizo.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Erizo registrado');
        }
      });
      jaiba.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Jaiba registrada');
        }
      });
      anguila.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Anguila registrada');
        }
      });
    }
  });
  */

  //Partidos Políticos
  /*
  //Datos:
  //  partido: String
  const PAN = new partido({nombre: 'Partido Acción Nacional'});
  const PRI = new partido({nombre: 'Partido Revolucionario Institucional'});
  const PRD = new partido({nombre: 'Partido de la Revolución Democrática'});
  const Verde = new partido({nombre: 'Partido Verde Ecologísta de México'});
  const PT = new partido({nombre: 'Partido del Trabajo'});
  const PANAL = new partido({nombre: 'Nueva Alianza'});
  const MC = new partido({nombre: 'Movimiento Ciudadano'});
  const Morena = new partido({nombre: 'Morena'});
  const ES = new partido({nombre: 'Encuentro Social'});

  PAN.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('PAN registrado');
    }
  });

  PRI.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('PRI registrado');
    }
  });

  PRD.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('PRD registrado');
    }
  });

  Verde.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('PV registrado');
    }
  });

  PT.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('PT registrado');
    }
  });

  PANAL.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('PANAL registrado');
    }
  });

  MC.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('MC registrado');
    }
  });

  Morena.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Morena registrado');
    }


    //Catálogo de Grados Académicos
    //Datos:
    //  grado: String
    //Registros:
    //  Técnico
    //  Ingeniería
    //  Maestría
    //  Licenciatura
    //  Doctorado
    const Grados = ['Técnico',
                    'Ingeniería',
                    'Maestría',
                    'Licenciatura',
                    'Doctorado'];

    const Grado_academico = mongoose.model('grado_academico');
    var idGrados = [];

    Grados.map((item) => {
      var grado = new Grado_academico({grado: item});
      grado.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(item + ' registrado');
        }
      });

      idGrados.push(grado._id);

      if (Grados.indexOf(item) == (Grados.length - 1)){
        //Lugares de estudio
        //Datos:
        //  lugar_estudio: String

        const lugaresEstudio = ['UNAM', 'IPN']
        const Lugar_estudio = mongoose.model('lugar_estudio');
        var idLugarEstudio = [];

        lugaresEstudio.map((item) => {
            var lEstudio = new Lugar_estudio({lugar_estudio: item});
            lEstudio.save(function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log(item + ' registrado');
                idLugarEstudio.push(lEstudio._id);
              }

              if (lugaresEstudio.indexOf(item) == (lugaresEstudio.length - 1)){
                const titulo = mongoose.model('estudio');
                var tituloAmlo = new titulo({titulo: 'Licenciatura', grado_academico: idGrados[3] , lugar_estudio: idLugarEstudio[0]})
                tituloAmlo.save(function (err) {
                  if (err) {
                    console.log(err);
                  }

                //Político: Andrés Manuel López Obrador
                const politico = mongoose.model('politico');
                var estudiosAmlo = [tituloAmlo._id]

                var AMLO = new politico({nombre: 'Andrés Manuel López Obrador',
                                        partido: Morena._id,
                                        cargo: 'Candidato',
                                        estado: "5a68b566f5985aaea61a93c3",
                                        estudios: estudiosAmlo,
                                        });
                AMLO.save(function (err) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('Andrés Manuel López Obrador registrado');
                  }
                });
                });
              }
            });
        });
      }
    });
  });

  ES.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('ES registrado');
    }
  });
  */

  //Registro (Prueba) de Votación
  /*
  var EstadoVotacion;
  var PoliticoPreferencia;
  var UsuarioPreferencia = [];
  var Preferencia;
  var Votacion;
  var PreferenciaVotacion = [];

  estado.findOne({nombre: "México"})
          .then((estado) => {
            EstadoVotacion = estado;
            usuario.findOne({nombre: "Erizo21"})
                    .then((usuario) => {
                      UsuarioPreferencia.push(usuario._id);
                      politico.findOne({nombre: "Andrés Manuel López Obrador"})
                              .then((politico) => {
                                PoliticoPreferencia = politico;
                                Preferencia = new preferencia({politico: PoliticoPreferencia._id, usuarios: UsuarioPreferencia});
                                Preferencia.save(function (err) {
                                  PreferenciaVotacion.push(Preferencia._id);

                                  if (err) {
                                    console.log(err);
                                  } else {
                                    Votacion = new votacion({estado: EstadoVotacion._id, preferencias: PreferenciaVotacion});
                                    Votacion.save(function (err) {
                                      if (err) {
                                        console.log(err);
                                      } else {
                                        console.log('Votación registrada');
                                      }
                                    });
                                  }
                                });
                              });
                    });
          });
    */

  //Registro de Ricardo Anaya
  /*
  const nombre = "Ricardo Anaya Córtes";
  const partido: {
      type: Schema.Types.ObjectId,
      ref: 'partido'
  },
  tipo_politico: {
      type: Schema.Types.ObjectId,
      ref: 'tipo_politico'
  },
  estado: {
      type: Schema.Types.ObjectId,
      ref: 'estado'
  },
  eventos: [{
      type: Schema.Types.ObjectId,
      ref: 'evento'
  }],
  estudios: [{
      type: Schema.Types.ObjectId,
      ref: 'estudio'
  }],
  propuestas: [{
      type: Schema.Types.ObjectId,
      ref: 'propuesta'
  }]
  */

  //Eventos de Andrés Manuel López Obrador
  /*
  var EventosAMLO = [];

  var fecha1 = new Date('1953');
  var fecha2 = new Date('1976');
  var fecha3 = new Date('1977');
  var fecha4 = new Date('1984');
  var fecha5 = new Date('1986');
  var fecha6 = new Date('1988');
  var fecha7 = new Date('1988');
  var fecha8 = new Date('1988');
  var fecha9 = new Date('1989');
  var fecha10 = new Date('1990');
  var fecha11 = new Date('1991');
  var fecha12 = new Date('1994');
  var fecha13 = new Date('1995');
  var fecha14 = new Date('1995');
  var fecha15 = new Date('1995');
  var fecha16 = new Date('1996');
  var fecha17 = new Date('1999');
  var fecha18 = new Date('2000');
  var fecha19 = new Date('2000');

  var Nacimiento = new evento({fecha: fecha1, titulo: 'Nacimiento', descripcion: 'Nace en Tepetitán, Macuspana, Tabasco'});
  var InicioCarrera = new evento({fecha: fecha2, titulo: 'Comienzo Político', descripcion: 'Apoya la candidatura de Carlos Pellicer (para Senador de Tabasco)', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var DirectorIIT = new evento({fecha: fecha3, titulo: 'Director del Instituto Indigenista de Tabasco', descripcion: 'Labora como Director del Instituto Indigenista de Tabasco', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var DirectorPSINC = new evento({fecha: fecha4, titulo: 'Director de Promoción', descripcion: 'Asume la dirección de Promoción Social del Instituto Nacional del consumidor', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var Libro1 = new evento({fecha: fecha5, titulo: 'Libro de 1986', descripcion: 'Se publica "Los primeros Pasos"', referencia: 'https://regeneracion.mx/cuantos-libros-ha-escrito-lopez-obrador/'});
  var Libro2 = new evento({fecha: fecha6, titulo: 'Libro de 1988', descripcion: 'Se publica "Del esplendor a la Sombra"', referencia: 'https://regeneracion.mx/cuantos-libros-ha-escrito-lopez-obrador/'});
  var UnionCorriente = new evento({fecha: fecha7, titulo: 'Unión a la Corriente Democrática', descripcion: 'Se une a la Corriente Democrática, junto a Cuauhtémoc Cárdenas y Porfirio Muñoz Ledo', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var CandidatoGobTabasco = new evento({fecha: fecha8, titulo: 'Candidato por la gobernatura de Tabasco', descripcion: 'Compite por la gobernatura de Tabasco', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var PresPRD = new evento({fecha: fecha9, titulo: 'Presidente del PRD en tabasco', descripcion: 'Al crearse el PRD, lo nombran presidente (del partido), en Tabasco', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var Libro3 = new evento({fecha: fecha10, titulo: 'Libro de 1990', descripcion: 'Se publica "Tabasco, víctima de un fraude"', referencia: 'https://regeneracion.mx/cuantos-libros-ha-escrito-lopez-obrador/'});
  var ExodoCdMx = new evento({fecha: fecha11, titulo: 'Éxodo en la Cd. de México', descripcion: 'Encabeza una marcha en la Ciudad de México, por irregularidades en las elecciones municipales en 1991', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var CandidatoGobTabasco2 = new evento({fecha: fecha12, titulo: 'Candidato por la gobernatura de Tabasco', descripcion: 'Compite por la gobernatura de Tabasco', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var Libro4 = new evento({fecha: fecha13, titulo: 'Libro de 1995', descripcion: 'Se publica "Entre la historia y la esperanza: Corrupción y lucha democrática en Tabasco"', referencia: 'https://regeneracion.mx/cuantos-libros-ha-escrito-lopez-obrador/'});
  var Exodo2 = new evento({fecha: fecha14, titulo: 'Éxodo por impedir la privatización de PEMEX', descripcion: 'Encabeza otra marcha, para impedir la privatización de PEMEX', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var AlianzaNacional = new evento({fecha: fecha15, titulo: 'Participación en la Alianza Nacional Democrática', descripcion: 'Participa en la iniciativa de creación de una Alianza Nacional Democrática', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var CandidatoPresPRD = new evento({fecha: fecha16, titulo: 'Contienda por la presidencia del PRD', descripcion: 'Compite por la presidencia del PRD, y gana la contienda por 3 años', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var Libro5 = new evento({fecha: fecha17, titulo: 'Libro de 1999', descripcion: 'Se publica "FOBAPROA, expediente abierto"', referencia: 'https://regeneracion.mx/cuantos-libros-ha-escrito-lopez-obrador/'});
  var RegistroJefGobCdMx = new evento({fecha: fecha18, titulo: 'Registro a candidato a Jefe de Gobierno en la Cd. de México', descripcion: 'Recibe su registro como candidato a Jefe de Gobierno del Distrito Federal', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var JefGobCdMx = new evento({fecha: fecha19, titulo: 'Ganador de las elecciones para Jefe de Gobierno', descripcion: 'Gana la contienda por Jefe de Gobierno del Distrito Federal, siendo el primero en gobernar por 6 años', referencia: 'http://lopezobrador.org.mx/semblanza/'});

  Nacimiento.save().then(() => {
    InicioCarrera.save().then(() => {
      DirectorIIT.save().then(() => {
        DirectorPSINC.save().then(() => {
          Libro1.save().then(() => {
            Libro2.save().then(() => {
              UnionCorriente.save().then(() => {
                CandidatoGobTabasco.save().then(() => {
                  PresPRD.save().then(() => {
                    Libro3.save().then(() => {
                      ExodoCdMx.save().then(() => {
                        CandidatoGobTabasco2.save().then(() => {
                          Libro4.save().then(() => {
                            Exodo2.save().then(() => {
                              AlianzaNacional.save().then(() => {
                                CandidatoPresPRD.save().then(() => {
                                  Libro5.save().then(() => {
                                    RegistroJefGobCdMx.save().then(() => {
                                      JefGobCdMx.save().then(() => {
                                        EventosAMLO = [Nacimiento, InicioCarrera, DirectorIIT, DirectorPSINC, Libro1, Libro2, UnionCorriente,
                                                      CandidatoGobTabasco, PresPRD, Libro3, ExodoCdMx, CandidatoGobTabasco2, Libro4, Exodo2,
                                                      AlianzaNacional, CandidatoPresPRD, Libro5, RegistroJefGobCdMx, JefGobCdMx];

                                        politico.findOne({nombre: 'Andrés Manuel López Obrador'}).then((registro) => {
                                          registro.set({eventos: EventosAMLO});
                                          registro.save((error) => {
                                            if (error){
                                              console.log(error);
                                            }
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
  */

  //Lugar de Estudios
  /*
  var lugaresEstudios = ['UNAM', 'UAM', 'IPN', 'ITAM'];
  var lugarEstudio;

  lugaresEstudios.map((item) => {
    lugarEstudio = new lugar_estudio({nombre: item});
    lugarEstudio.save();
  });
  */

  //Estudios
  /*
  var NombreGradoAcademico = [];
  var IdGradoAcademico = [];
  var NombreLugar = [];
  var idLugar = [];
  var estudioPolitico;
  var EstudiosPolitico = [];

  grado_academico.find({}).then((grados) => {
    grados.map((item) => {
      NombreGradoAcademico.push(item.grado);
      IdGradoAcademico.push(item._id);

      if ((grados.length - 1) == grados.indexOf(item)){
        lugar_estudio.find({}).then((lugaresEstudio) => {
          lugaresEstudio.map((item) => {
            NombreLugar.push(item.nombre);
            idLugar.push(item._id);

            if ((lugaresEstudio.length - 1) == lugaresEstudio.indexOf(item)){
              var titulo = 'Ciencias Políticas y Administración Pública';
              var grado = IdGradoAcademico[NombreGradoAcademico.indexOf('Licenciatura')];
              var lugar = idLugar[NombreLugar.indexOf('UNAM')];

              estudioPolitico = new estudio({titulo: titulo, grado_academico: grado, lugar_estudio: lugar});
              estudioPolitico.save().then(() => {
                EstudiosPolitico.push(estudioPolitico._id);

                politico.findOne({nombre: 'Andrés Manuel López Obrador'}).then((registro) => {
                  registro.set({estudios: EstudiosPolitico});
                  registro.save((error) => {
                    if (error){
                      console.log(error);
                    }
                  });
                });
              });
            }
          });
        });
      }
    });
  });
  */

  //Propuestas AMLO
  /*
  var propuestasAMLO = [];

  var propuesta1_2018_fecha = new Date('2018');

  var NombreTipoPropuesta = [];
  var IdTipoPropuesta = [];

  tipo_propuesta.find().then((registros) => {
    registros.map((item) => {
      NombreTipoPropuesta.push(item.tipo);
      IdTipoPropuesta.push(item._id);

      if (registros.indexOf(item) == (registros.length() - 1) {

      }
    });
  });
  */

  //Catálogo de Tipo de Propuesta
  /*
  //Datos:
  //  tipo: String
  //Registros:
  //  Social
  //  Económico
  //  Tecnológico
  //  Educativo
  //  Cultural
  //  Salud
  //  Infraestructura
  //  Seguridad
  const Tipo_prouesta = mongoose.model('tipo_propuesta');
  const tipoPropuesta = ['Social',
                        'Económico',
                        'Tecnológico',
                        'Educativo',
                        'Cultural',
                        'Salud',
                        'Infraestructura',
                        'Seguridad'];

  tipoPropuesta.map((item) => {
    var tPropuesta = new Tipo_prouesta({tipo: item});
    tPropuesta.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Tipo de propuesta registrado');
      }
    })
  })
  */

  //Registro de propuestas de propuesta, evento y politico
  var fecha1 = new Date('1953');
  var fecha2 = new Date('1976');
  var fecha3 = new Date('1977');

  var Nacimiento = new solicitud_evento({usuario: "5a68bcaae9bfc6a2fee8cb09", politico: "5a68bb57976c3ba5d6bd37c3", fecha: fecha1, titulo: 'Nacimiento', descripcion: 'Nace en Tepetitán, Macuspana, Tabasco', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var InicioCarrera = new solicitud_evento({usuario: "5a68bcaae9bfc6a2fee8cb09", politico: "5a68bb57976c3ba5d6bd37c3", fecha: fecha2, titulo: 'Comienzo Político', descripcion: 'Apoya la candidatura de Carlos Pellicer (para Senador de Tabasco)', referencia: 'http://lopezobrador.org.mx/semblanza/'});
  var DirectorIIT = new solicitud_evento({usuario: "5a68bcaae9bfc6a2fee8cb09", politico: "5a68bb57976c3ba5d6bd37c3", fecha: fecha3, titulo: 'Director del Instituto Indigenista de Tabasco', descripcion: 'Labora como Director del Instituto Indigenista de Tabasco', referencia: 'http://lopezobrador.org.mx/semblanza/'});

  var Propuesta1 = new solicitud_propuesta({usuario: "5a68bcaae9bfc6a2fee8cb0c", politico: "5a68bb57976c3ba5d6bd37c3", fecha: fecha1, titulo: 'Menos Gastos', tipo_propuesta: "5a68c182c8ecfc981ee215cf", descripcion: 'Reducción de gastos gubernamentales', referencia: 'http://www.proceso.com.mx/463327/amlo-doce-sus-polemicas-propuestas-2018'});
  var Propuesta2 = new solicitud_propuesta({usuario: "5a68bcaae9bfc6a2fee8cb0c", politico: "5a68bb57976c3ba5d6bd37c3", fecha: fecha2, titulo: 'Más escuelas', tipo_propuesta: "5a68c182c8ecfc981ee215cf", descripcion: 'Construcción de nuevas escuelas', referencia: 'http://www.proceso.com.mx/463327/amlo-doce-sus-polemicas-propuestas-2018'});
  var Propuesta3 = new solicitud_propuesta({usuario: "5a68bcaae9bfc6a2fee8cb0c", politico: "5a68bb57976c3ba5d6bd37c3", fecha: fecha3, titulo: 'Mejores Salarios', tipo_propuesta: "5a68c182c8ecfc981ee215cf", descripcion: 'Aumento del Salario en 3 pesos', referencia: 'http://www.proceso.com.mx/463327/amlo-doce-sus-polemicas-propuestas-2018'});

  var estudios = ["5a6967f6d31a65a3fac70aeb"];

  var Candidato1 = new solicitud_politico({usuario: "5a68bcaae9bfc6a2fee8cb0a", nombre: "Bronco", cargo: 'Candidato', estado: "5a68b566f5985aaea61a93b0", partido: "5a68bb54976c3ba5d6bd37b5", estudios});
  var Candidato2 = new solicitud_politico({usuario: "5a68bcaae9bfc6a2fee8cb0a", nombre: "Anaya", cargo: 'Candidato', estado: "5a68b566f5985aaea61a93b0", partido: "5a68bb54976c3ba5d6bd37b5", estudios});
  var Funcionario1 = new solicitud_politico({usuario: "5a68bcaae9bfc6a2fee8cb0a", nombre: "Mancera", cargo: 'Funcionario', estado: "5a68b566f5985aaea61a93b0", partido: "5a68bb54976c3ba5d6bd37b5", estudios});

  Nacimiento.save();
  InicioCarrera.save();
  DirectorIIT.save();

  Propuesta1.save();
  Propuesta2.save();
  Propuesta3.save();

  Candidato1.save();
  Candidato2.save();
  Funcionario1.save();
};

exports.pruebas = function (req, res) {
    Registro();
};
