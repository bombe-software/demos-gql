require('./estado');
require('./evento');
require('./grado_academico');
require('./lugar_estudio');
require('./estudio'); //requiere [lugar_estudio, grado_academico]
require('./partido');
require('./tipo_propuesta');
require('./tipo_usuario');
require('./propuesta');//requiere [tipo_propuesta]
require('./politico'); //requiere [partido, estado, [eventos], [estudios], [propuestas]
require('./usuario');//requiere [tipo_usuario]
require('./preferencia');//requiere [politico, [usuarios]]
require('./votacion');//requiere [estado, [preferencias]]
require('./zona');//requiere [[estados]]
require('./propuesta_evento');  //requiere [usuario, idPolitico, evento]
require('./propuesta_politico');  //requiere [usuario, politico]
require('./propuesta_propuesta');  //requiere [usuario, idPolitico, propuesta]
