import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './empresa.reducer';
import { IEmpresa } from 'app/shared/model/empresa/empresa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmpresaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Empresa = (props: IEmpresaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { empresaList, match, loading } = props;
  return (
    <div>
      <h2 id="empresa-heading">
        <Translate contentKey="gatewayApp.empresaEmpresa.home.title">Empresas</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gatewayApp.empresaEmpresa.home.createLabel">Create new Empresa</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {empresaList && empresaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.empresaEmpresa.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.empresaEmpresa.direccion">Direccion</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.empresaEmpresa.cUIT">C UIT</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.empresaEmpresa.telefono">Telefono</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {empresaList.map((empresa, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${empresa.id}`} color="link" size="sm">
                      {empresa.id}
                    </Button>
                  </td>
                  <td>{empresa.nombre}</td>
                  <td>{empresa.direccion}</td>
                  <td>{empresa.cUIT}</td>
                  <td>{empresa.telefono}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${empresa.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${empresa.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${empresa.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="gatewayApp.empresaEmpresa.home.notFound">No Empresas found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ empresa }: IRootState) => ({
  empresaList: empresa.entities,
  loading: empresa.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Empresa);
