import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './proveedor.reducer';
import { IProveedor } from 'app/shared/model/empresa/proveedor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProveedorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProveedorDetail = (props: IProveedorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { proveedorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.empresaProveedor.detail.title">Proveedor</Translate> [<b>{proveedorEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="gatewayApp.empresaProveedor.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{proveedorEntity.nombre}</dd>
          <dt>
            <span id="direccion">
              <Translate contentKey="gatewayApp.empresaProveedor.direccion">Direccion</Translate>
            </span>
          </dt>
          <dd>{proveedorEntity.direccion}</dd>
          <dt>
            <span id="cuit">
              <Translate contentKey="gatewayApp.empresaProveedor.cuit">Cuit</Translate>
            </span>
          </dt>
          <dd>{proveedorEntity.cuit}</dd>
          <dt>
            <span id="telefono">
              <Translate contentKey="gatewayApp.empresaProveedor.telefono">Telefono</Translate>
            </span>
          </dt>
          <dd>{proveedorEntity.telefono}</dd>
          <dt>
            <Translate contentKey="gatewayApp.empresaProveedor.empresa">Empresa</Translate>
          </dt>
          <dd>{proveedorEntity.empresa ? proveedorEntity.empresa.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/proveedor" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/proveedor/${proveedorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ proveedor }: IRootState) => ({
  proveedorEntity: proveedor.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProveedorDetail);
