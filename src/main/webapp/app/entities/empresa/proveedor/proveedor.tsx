import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './proveedor.reducer';
import { IProveedor } from 'app/shared/model/empresa/proveedor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProveedorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Proveedor = (props: IProveedorProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { proveedorList, match, loading } = props;
  return (
    <div>
      <h2 id="proveedor-heading">
        <Translate contentKey="gatewayApp.empresaProveedor.home.title">Proveedors</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gatewayApp.empresaProveedor.home.createLabel">Create new Proveedor</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {proveedorList && proveedorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.empresaProveedor.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.empresaProveedor.direccion">Direccion</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.empresaProveedor.cuit">Cuit</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.empresaProveedor.telefono">Telefono</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.empresaProveedor.empresa">Empresa</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {proveedorList.map((proveedor, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${proveedor.id}`} color="link" size="sm">
                      {proveedor.id}
                    </Button>
                  </td>
                  <td>{proveedor.nombre}</td>
                  <td>{proveedor.direccion}</td>
                  <td>{proveedor.cuit}</td>
                  <td>{proveedor.telefono}</td>
                  <td>{proveedor.empresa ? <Link to={`empresa/${proveedor.empresa.id}`}>{proveedor.empresa.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${proveedor.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${proveedor.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${proveedor.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gatewayApp.empresaProveedor.home.notFound">No Proveedors found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ proveedor }: IRootState) => ({
  proveedorList: proveedor.entities,
  loading: proveedor.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Proveedor);
