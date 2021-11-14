import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmpresa } from 'app/shared/model/empresa/empresa.model';
import { getEntities as getEmpresas } from 'app/entities/empresa/empresa/empresa.reducer';
import { getEntity, updateEntity, createEntity, reset } from './proveedor.reducer';
import { IProveedor } from 'app/shared/model/empresa/proveedor.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProveedorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProveedorUpdate = (props: IProveedorUpdateProps) => {
  const [empresaId, setEmpresaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { proveedorEntity, empresas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/proveedor');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmpresas();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...proveedorEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.empresaProveedor.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.empresaProveedor.home.createOrEditLabel">Create or edit a Proveedor</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : proveedorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="proveedor-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="proveedor-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="proveedor-nombre">
                  <Translate contentKey="gatewayApp.empresaProveedor.nombre">Nombre</Translate>
                </Label>
                <AvField
                  id="proveedor-nombre"
                  type="text"
                  name="nombre"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="direccionLabel" for="proveedor-direccion">
                  <Translate contentKey="gatewayApp.empresaProveedor.direccion">Direccion</Translate>
                </Label>
                <AvField id="proveedor-direccion" type="text" name="direccion" />
              </AvGroup>
              <AvGroup>
                <Label id="cuitLabel" for="proveedor-cuit">
                  <Translate contentKey="gatewayApp.empresaProveedor.cuit">Cuit</Translate>
                </Label>
                <AvField id="proveedor-cuit" type="string" className="form-control" name="cuit" />
              </AvGroup>
              <AvGroup>
                <Label id="telefonoLabel" for="proveedor-telefono">
                  <Translate contentKey="gatewayApp.empresaProveedor.telefono">Telefono</Translate>
                </Label>
                <AvField id="proveedor-telefono" type="string" className="form-control" name="telefono" />
              </AvGroup>
              <AvGroup>
                <Label for="proveedor-empresa">
                  <Translate contentKey="gatewayApp.empresaProveedor.empresa">Empresa</Translate>
                </Label>
                <AvInput id="proveedor-empresa" type="select" className="form-control" name="empresa.id">
                  <option value="" key="0" />
                  {empresas
                    ? empresas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/proveedor" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  empresas: storeState.empresa.entities,
  proveedorEntity: storeState.proveedor.entity,
  loading: storeState.proveedor.loading,
  updating: storeState.proveedor.updating,
  updateSuccess: storeState.proveedor.updateSuccess,
});

const mapDispatchToProps = {
  getEmpresas,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProveedorUpdate);
