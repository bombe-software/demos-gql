require('./estado');
require('./evento');
require('./grado_academico');
require('./lugar_estudio');
require('./estudio'); //requiere [lugar_estudio, grado_academico]
require('./partido');
require('./tipo_politico');
require('./tipo_propuesta');
require('./tipo_usuario');
require('./propuesta');//requiere [tipo_propuesta]
require('./politico'); //requiere [partido, tipo_politico, estado, evento, estudio, propuesta]
require('./usuario');//requiere [usuario]
require('./preferencia');//requiere [politico, usuario]
require('./votacion');//requiere [estado, preferencia]
require('./zona');//requiere estado
