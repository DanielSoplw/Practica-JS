const SUPABASE_URL =
    "https://fkerrrjhnvlzpsudwtqv.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_tNmOzsjyxPv5U7u6bwXyXA_bBBCovYP";

function obtenerHeaders() {

    return {
        "apikey": SUPABASE_KEY,
        "Content-Type": "application/json"
    };
}

async function obtenerEstudiantes() {

    try {

        const respuesta = await fetch(
            `${SUPABASE_URL}/rest/v1/estudiantes?select=*`,
            {
                method: "GET",
                headers: obtenerHeaders()
            }
        );

        if (!respuesta.ok) {
            throw new Error(
                "No fue posible consultar estudiantes"
            );
        }

        const estudiantes =
            await respuesta.json();

        console.log(estudiantes);

        mostrarEstudiantes(estudiantes);

    } catch (error) {

        console.error(
            "Error:",
            error
        );
    }
}

function mostrarEstudiantes(estudiantes) {

    const tabla = document.querySelector(
        "#tablaEstudiantes"
    );

    tabla.innerHTML = "";

    estudiantes.forEach(estudiante => {

        tabla.innerHTML += `
            <tr>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.correo}</td>
                <td>${estudiante.programa}</td>
                <td>${estudiante.estado}</td>
                <td>
                    <button
                        onclick="editarEstudiante(${estudiante.id})"
                    >
                        Editar
                    </button>

                    <button
                        onclick="eliminarEstudiante(${estudiante.id})"
                    >
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

obtenerEstudiantes();