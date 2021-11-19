import { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form, DatePicker, Select, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import swal from 'sweetalert';

const { Option } = Select;

const { Item } = Form;
const url = "http://127.0.0.1:8000/api/"


const Matriculas = () => {

    const [modalInsertar, SetmodalInsertar] = useState(false);
    const [data, setData] = useState([]);
    const [dataModal, setDataModal] = useState({});
    const [sucursal, SetSucursal] = useState({});
    const [alumnos, setAlumnos] = useState([]);
    const [matricula, setMatricula] = useState({})
    const [cursos, setCursos] = useState([])
    const [estadoCurso, setEstadoCurso] = useState([])
    const [agregar, setAgregar] = useState(true)


    const abrirmodalInsertar = () => {
        setAgregar(true)
        SetmodalInsertar(!modalInsertar);
    }

    const change = e => {
        const { name, value } = e.target;
        setMatricula({
            ...matricula,
            [name]: value
        });
        console.log(matricula);
    }


    const columns = [{
        title: "Alumno",
        dataIndex: "Nombre_Alumno",
        key: "Nombre_Alumno"
    },
    {
        title: "Curso",
        dataIndex: "Nombre_Curso",
        key: "Nombre_Curso"
    },
    {
        title: "Estado",
        dataIndex: "Estado",
        key: "Estado "
    },
    {
        title: "Fecha Ingreso",
        dataIndex: "FechaIngreso",
        key: "FechaIngreso "
    },
    {
        title: "Acciones",
        key: "acciones",
        render: (e, i) => (
            <>
                <Button type="primary" onClick={(e) => {
                    setMatricula(i)
                    SetmodalInsertar(true)
                    setAgregar(false)
                }}>Editar </Button>
             
            </>
        ),
    },
    ];

    const peticionesGet = async () => {
        try {
            const { data } = await axios.get(url + 'ObtenerMatriculas')
            setData(data);
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerAlumnos = async () => {
        try {
            const { data } = await axios.get(url + 'ObtenerAlumnos')
            setAlumnos(data);
        } catch (error) {
            console.log(error)
        }
    }
    const obtenerCursos = async () => {
        try {
            const { data } = await axios.get(url + 'ObtenerCursos')
            setCursos(data);
        } catch (error) {
            console.log(error)
        }
    }
    const obtenerEstadoCurso = async () => {
        try {
            const { data } = await axios.get(url + 'ObtenerEstadoCurso')
            setEstadoCurso(data);
        } catch (error) {
            console.log(error)
        }
    }

    const guardar = async () => {
        const r = sucursal.IdMatricula
       
        
        if (agregar == true) {
            try {
                const { data } = await axios.post(url + 'Insert', {
                    ...matricula

                });
                abrirmodalInsertar();
                swal("Registro Exitoso", "El registro se inserto correctamente", "success");
            } catch (error) {
                console.log(error)
            }
        }
        else {
            if(matricula.IdEstadoCurso == 2){
                try {
                    const { data } = await axios.post(url + 'UpdateMatricula', {
                        ...matricula
                    });
                    abrirmodalInsertar();
                    swal("Modificacion exitoso", "El registro se actualizo correctamente", "success");
                } catch (error) {
                    console.log(error)
                }
            }
            else{
                swal("Error", "No puede agregar nota, si el alumno no a finalizado el curso", "error");

            }
           
        }
        setMatricula({})
        peticionesGet()
    }


    function onChangeFecha(date, dateString) {
        setMatricula({ ...matricula, FechaIngreso: dateString })
        console.log(dateString);
    }

    const mapAlumnos = alumnos.map(function (e) {
        return <Option key={e.IdAlumno}>{e.Nombre} {e.Apellido}</Option>
    })

    const mapCurso = cursos.map(function (e) {
        return <Option key={e.IdCurso}>{e.Nombre}</Option>
    })

    const mapEstadosCurso = estadoCurso.map(function (e) {
        return <Option key={e.IdEstado}>{e.Estado}</Option>
    })

    useEffect(() => {
        peticionesGet();
        obtenerAlumnos();
        obtenerCursos();
        obtenerEstadoCurso();
    }, [])

    function onChangeAlumno(value) {
        setMatricula({ ...matricula, IdAlumno: value })
        console.log(`selected ${value}`);
    }
    function onChangeCurso(value) {
        setMatricula({ ...matricula, IdCurso: value })
        console.log(`selected ${value}`);
    }

    function onChangeEstadoCurso(value) {
        setMatricula({ ...matricula, IdEstadoCurso: value })
        console.log(`selected ${value}`);
    }

    function onChangeNumber(value) {
        setMatricula({ ...matricula, Nota: value })
    }
    return (
        <div className="App" >
            <br />
            <Button type="primary" className="btn-nuevo" onClick={abrirmodalInsertar} >Nuevo</Button>
            <br />
            <br />
            <div className="container">
                <Table columns={columns} dataSource={data} size="small" />

            </div>



            <Modal

                visible={modalInsertar}
                title="Insertar Registro"
                destroyOnClose={true}
                oncancel={abrirmodalInsertar}
                centered
                footer={[
                    <Button onClick={abrirmodalInsertar} >Cancelar</Button>,
                    <Button type="primary" onClick={
                        () => {
                            guardar()
                        }}>Insertar</Button>

                ]}
            >
                <Form>
                    <Item label="Alumno">
                        <Select onChange={onChangeAlumno} value={matricula.IdAlumno}>
                            {mapAlumnos}
                        </Select>
                    </Item>
                    <Item label="Curso">
                        <Select onChange={onChangeCurso} value={matricula.IdCurso}>
                            {mapCurso}
                        </Select>
                    </Item>

                    <Item label="Estado de matricula">
                        <Select onChange={onChangeEstadoCurso} value={matricula.IdEstadoCurso}>
                            {mapEstadosCurso}
                        </Select>
                    </Item>

                    <Item label="Fecha Ingreso">
                        <DatePicker onChange={onChangeFecha}/>

                    </Item>

                    {
                        agregar ?

                            <>
                            </>
                            :
                            <>
                            <Item label={'Nota'}>
                            <InputNumber min={0} max={10} defaultValue={0} step={'0.00'} onChange={onChangeNumber} />

                            </Item>

                            </>
                    }


                </Form>
            </Modal>
        </div>



    )

}

export default Matriculas;