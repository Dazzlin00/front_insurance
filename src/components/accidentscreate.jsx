import React from 'react'

function accidentscreate() {
    return (
<div className="row" style={{marginTop:100}}>
        <div className="col-sm-8 mx-auto">
            <div className="card">
            <div className="card-header">
                NUEVO SINIESTRO
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Nro. Documento</label>
                        <div className="input-group ">
                            <input type="text" className="form-control" placeholder="Nro. Documento"/>
                            <button className="btn btn-outline-secondary" type="button">Buscar</button>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="mb-3">
                        <label  className="form-label">Número de póliza</label>
                        <input type="text" className="form-control"  placeholder="Número de póliza" disabled/>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <div className="mb-3">
                        <label  className="form-label">Asegurado</label>
                        <input type="text" className="form-control"  placeholder="Nombre y Apellido / Razón Social" disabled/>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                    <div className="mb-3">
                        <label  className="form-label">Estado de ocurrencia</label>
                        <input type="text" className="form-control"  placeholder="Estado de ocurrencia"/>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <label  className="form-label">Ciúdad de ocurrencia</label>
                        <input type="text" className="form-control"  placeholder="Ciúdad de ocurrencia"/>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="mb-3">
                        <label  className="form-label">Lugar de ocurrencia</label>
                        <input type="text" className="form-control"  placeholder="Lugar de ocurrencia"/>
                    </div>
                    </div>  
                </div>
                <div className="row">
                    <div className="col-md-6">
                    <div className="mb-3">
                        <label  className="form-label">Fecha del siniestro</label>
                        <input type="date" className="form-control" />
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="mb-3">
                        <label  className="form-label">Fecha de declaración</label>
                        <input type="date" className="form-control" />
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <div className="mb-3">
                        <label  className="form-label">Descripción del siniestro</label>
                        <textarea className="form-control" cols="30" rows="8"></textarea>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 d-grid">
                        <button className="btn btn-primary" type="submit">Registrar</button>
                    </div>
                    <div className="col-md-6 d-grid">
                        <button className="btn btn-outline-secondary" type="submit">Cancelar</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default accidentscreate