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
require('./logs');
require('./usuario_confirmar');
require('./preferencia');//requiere [politico, [usuarios]]
require('./votacion');//requiere [estado, [preferencias]]
require('./zona');//requiere [[estados]]
require('./solicitud_evento');  //requiere [usuario, idPolitico, evento]
require('./solicitud_politico');  //requiere [usuario, politico]
require('./solicitud_propuesta');  //requiere [usuario, idPolitico, propuesta]
require('./solicitud_modificar_politico');
require('./solicitud_modificar_propuesta');
require('./soliticitud_modificar_evento');
