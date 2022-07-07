const mongoose = require('mongoose');

// {
//     "CLAVE": "      2664",
//     "NOMBRE": "DARINKA ESTHER",
//     "AP_PAT_": "NAVARRETE",
//     "AP_MAT_": "ALVAREZ",
//     "STATUS": "A",
//     "R_F_C_": "NAAD950103DV1",
//     "DEPTO": "   42",
//     "PUESTO": "D",
//     "IMSS": "19169505492",
//     "CLASIF": "SFPAD1?C",
//     "FECH_ALTA": "2021-09-16 00:00:00",
//     "FECH_BAJA": "NULL",
//     "DIG_GRAV_": " ",
//     "FORM_PAGO": "C",
//     "SAL_DIARIO": "189.33",
//     "SDI": "207.97",
//     "SDI_INFO": "0",
//     "FECH_SAL": "2021-09-16 00:00:00",
//     "TIP_SAL": "F",
//     "CAMB_SDI": "N",
//     "CALLE": "",
//     "COLONIA": "",
//     "CD_POBLAC": "",
//     "ENT_FED": " 0",
//     "COD_POST": "",
//     "BANC_NOM": "0",
//     "LOCALI_NOM": "",
//     "CTRL_NOM": "",
//     "CTACHEQNOM": "",
//     "LUG_NACIM": "31",
//     "MUNICIPIO": "",
//     "TIP_EMPL": "C",
//     "CONTRATO": "P",
//     "TURNO": "X",
//     "EDO_CIVIL": "S",
//     "UN_MED_FAM": "0",
//     "TIPOSANGRE": "0",
//     "BAND1": "",
//     "BAND2": "",
//     "PENS_ALIM": "N",
//     "D_DESCANSO": "",
//     "CAUSABAJA": "0",
//     "DISPONIBLE": "",
//     "VERSION": "(",
//     "NOM_PADRE": "",
//     "NOM_MADRE": "",
//     "TELEFONO": "",
//     "SEXO": "M",
//     "FECH_NACIM": "1995-01-03 00:00:00",
//     "NUMFONACOT": "",
//     "TB_INTEG": "4",
//     "CURP": "NAAD950103MYNVLR05",
//     "FAL_DESC_N": "0",
//     "FAL_DESC_P": "0",
//     "FAL_SEPT_N": "0",
//     "FAL_SEPT_P": "0",
//     "FAL_INC_N": "0",
//     "FAL_INC_P": "0",
//     "FAL_AUS_N": "0",
//     "FAL_AUS_P": "0",
//     "FAL_INFO_N": "0",
//     "FAL_INFO_P": "0",
//     "FAL_PTU_N": "0",
//     "FAL_PTU_P": "0",
//     "TOTAL1": "3338",
//     "TOTAL2": "12356",
//     "TOTAL3": "185",
//     "TOTAL4": "370",
//     "TIPO_DESC": "",
//     "CANT_DESC": "0",
//     "F_INI_CTO": "2021-09-16 00:00:00",
//     "F_VENC_CTO": "NULL",
//     "EMAIL": "navarretedarinka95@gmail.com",
//     "TELEFONO2": "",
//     "DECLARA": "S",
//     "TABLA_VAC": "5",
//     "TIPOEXC": "NULL",
//     "NIVEL_ESTUDIOS": "0",
//     "PROFESION": "",
//     "ENFERMEDADES": "",
//     "NOMBRE_EMERGENCIA": "",
//     "DIRECCION_EMERGENCIA": "",
//     "TEL_EMERGENCIA": "",
//     "CAPACITACIONES": "",
//     "AREAGEO": "N",
//     "OBSERVACION": "",
//     "TIPOJORNADA": "0",
//     "CAL_SEPT_DIA": "N",
//     "REG_PAT": "0",
//     "TIPO_JORNADALA": "C",
//     "SUELDOXHORA": "23.66625",
//     "TOTALHOXDIA": "8",
//     "TDIASPERIODO": "7",
//     "TIPO_INGRESOS": "2",
//     "CANTIDAD_POR_INGRESO": "0",
//     "PAIS": "MEXICO",
//     "CVE_REGCONTB": "2",
//     "EMAIL2": "",
//     "DIAS_DESCANSO": "1000001",
//     "RE_TIPOCONTRATO": "01",
//     "RE_TIPOJORNADA": "01",
//     "ENTIDAD_FEDERATIVA": "YUC",
//     "RE_PLANTILLACFDI": "",
//     "RE_CVEREGCONTB": "02",
//     "RE_BANCO": "000",
//     "ISR_RETIRO": "0",
//     "INDEMNIZADO": "0",
//     "LIQUIDADO": "0"
// }





const PartesSchema = mongoose.Schema({
    CLAVE: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    NOMBRE: {
        type: String,
        required: true,
        trim: true,
    },
    AP_PAT_: {
        type: String,
        required: true,
        trim: true,
    },
    AP_MAT_: {
        type: String,
        required: true,
        trim: true,
    },
    R_F_C_: {
        type: String,
        required: true,
        trim: true,
    },
    IMSS: {
        type: String,
        required: true,
        trim: true,
    },
    DEPTO: {
        type: String,
        required: true,
        trim: true,
    },
    EMAIL: {
        type: String,
        required: true,
        trim: true,
    },
    CURP: {
        type: String,
        required: true,
        trim: true,
    },
    creado: {
        type: Date,
        default: Date.now() 
    }, 
    vendedor: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Usuario'
    },
    FECH_ALTA: {
        type: String,

    },

});

module.exports = mongoose.model('Parte', PartesSchema);