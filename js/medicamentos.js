const medicamentos = [

{
    id:1,
    nome:"Dipirona 500 mg",
    principio:"Dipirona Monoidratada",
    categoria:"Analgésico",
    estoque:125,
    receita:false
},

{
    id:2,
    nome:"Paracetamol 750 mg",
    principio:"Paracetamol",
    categoria:"Analgésico",
    estoque:58,
    receita:false
},

{
    id:3,
    nome:"Ibuprofeno 600 mg",
    principio:"Ibuprofeno",
    categoria:"Analgésico",
    estoque:18,
    receita:false
},

{
    id:4,
    nome:"Amoxicilina 500 mg",
    principio:"Amoxicilina",
    categoria:"Antibiótico",
    estoque:40,
    receita:true
},

{
    id:5,
    nome:"Azitromicina 500 mg",
    principio:"Azitromicina",
    categoria:"Antibiótico",
    estoque:12,
    receita:true
},

{
    id:6,
    nome:"Cefalexina 500 mg",
    principio:"Cefalexina",
    categoria:"Antibiótico",
    estoque:8,
    receita:true
},

{
    id:7,
    nome:"Losartana 50 mg",
    principio:"Losartana Potássica",
    categoria:"Hipertensão",
    estoque:210,
    receita:true
},

{
    id:8,
    nome:"Enalapril 10 mg",
    principio:"Maleato de Enalapril",
    categoria:"Hipertensão",
    estoque:64,
    receita:true
},

{
    id:9,
    nome:"Captopril 25 mg",
    principio:"Captopril",
    categoria:"Hipertensão",
    estoque:22,
    receita:true
},

{
    id:10,
    nome:"Atenolol 50 mg",
    principio:"Atenolol",
    categoria:"Cardiológico",
    estoque:75,
    receita:true
},

{
    id:11,
    nome:"Carvedilol 25 mg",
    principio:"Carvedilol",
    categoria:"Cardiológico",
    estoque:28,
    receita:true
},

{
    id:12,
    nome:"Sinvastatina 20 mg",
    principio:"Sinvastatina",
    categoria:"Cardiológico",
    estoque:130,
    receita:true
},

{
    id:13,
    nome:"Metformina 850 mg",
    principio:"Metformina",
    categoria:"Diabetes",
    estoque:180,
    receita:true
},

{
    id:14,
    nome:"Glibenclamida 5 mg",
    principio:"Glibenclamida",
    categoria:"Diabetes",
    estoque:40,
    receita:true
},

{
    id:15,
    nome:"Insulina NPH",
    principio:"Insulina Humana NPH",
    categoria:"Diabetes",
    estoque:16,
    receita:true
},

{
    id:16,
    nome:"Omeprazol 20 mg",
    principio:"Omeprazol",
    categoria:"Gastrointestinal",
    estoque:98,
    receita:false
},

{
    id:17,
    nome:"Pantoprazol 40 mg",
    principio:"Pantoprazol",
    categoria:"Gastrointestinal",
    estoque:43,
    receita:true
},

{
    id:18,
    nome:"Loratadina 10 mg",
    principio:"Loratadina",
    categoria:"Antialérgico",
    estoque:115,
    receita:false
},

{
    id:19,
    nome:"Cetirizina 10 mg",
    principio:"Cetirizina",
    categoria:"Antialérgico",
    estoque:19,
    receita:false
},

{
    id:20,
    nome:"Prednisona 20 mg",
    principio:"Prednisona",
    categoria:"Anti-inflamatório",
    estoque:36,
    receita:true
},

{
    id:21,
    nome:"Diclofenaco 50 mg",
    principio:"Diclofenaco Sódico",
    categoria:"Anti-inflamatório",
    estoque:82,
    receita:false
},

{
    id:22,
    nome:"Nimesulida 100 mg",
    principio:"Nimesulida",
    categoria:"Anti-inflamatório",
    estoque:27,
    receita:true
},

{
    id:23,
    nome:"Hidrocortisona Creme",
    principio:"Hidrocortisona",
    categoria:"Dermatológico",
    estoque:24,
    receita:false
},

{
    id:24,
    nome:"Cetoconazol Creme",
    principio:"Cetoconazol",
    categoria:"Dermatológico",
    estoque:31,
    receita:false
},

{
    id:25,
    nome:"Pomada Nebacetin",
    principio:"Neomicina + Bacitracina",
    categoria:"Dermatológico",
    estoque:54,
    receita:false
}

];

// =============================================
// Informações complementares automáticas
// =============================================

function obterFabricante(categoria){

    const fabricantes = {

        "Analgésico":"EMS / Medley / Genérico",

        "Antibiótico":"Eurofarma / Medley / Genérico",

        "Hipertensão":"Neo Química / Genérico",

        "Cardiológico":"Aché / Genérico",

        "Diabetes":"Novo Nordisk / EMS",

        "Gastrointestinal":"Medley / EMS",

        "Antialérgico":"Neo Química",

        "Anti-inflamatório":"Eurofarma",

        "Dermatológico":"EMS"

    };

    return fabricantes[categoria] || "Genérico";

}

// =============================================

function obterApresentacao(nome){

    if(nome.includes("Creme")) return "Creme";

    if(nome.includes("Pomada")) return "Pomada";

    if(nome.includes("Insulina")) return "Frasco";

    return "Comprimidos";

}

// =============================================

function obterIndicacao(categoria){

    const indicacoes = {

        "Analgésico":"Alívio da dor e redução da febre.",

        "Antibiótico":"Tratamento de infecções bacterianas.",

        "Hipertensão":"Controle da pressão arterial.",

        "Cardiológico":"Tratamento de doenças cardiovasculares.",

        "Diabetes":"Controle dos níveis de glicose no sangue.",

        "Gastrointestinal":"Tratamento de distúrbios gastrointestinais.",

        "Antialérgico":"Tratamento de alergias.",

        "Anti-inflamatório":"Redução de inflamações e dores.",

        "Dermatológico":"Tratamento de doenças da pele."

    };

    return indicacoes[categoria] || "Conforme orientação médica.";

}

// =============================================

function obterArmazenamento(){

    return "Armazenar em local seco, protegido da luz e fora do alcance de crianças.";

}

// =============================================

function obterObservacoes(receita){

    if(receita){

        return "Medicamento sujeito à apresentação de receita médica.";

    }

    return "Utilizar conforme orientação do profissional de saúde.";

}