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
import { getEntity, updateEntity, createEntity, reset } from './cliente.reducer';
import { ICliente } from 'app/shared/model/empresa/cliente.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ClienteUpdate = (props: IClienteUpdateProps) => {
  const [empresaId, setEmpresaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { clienteEntity, empresas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/cliente');
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
        ...clienteEntity,
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
          <h2 id="gatewayApp.empresaCliente.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.empresaCliente.home.createOrEditLabel">Create or edit a Cliente</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : clienteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="cliente-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="cliente-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="cliente-nombre">
                  <Translate contentKey="gatewayApp.empresaCliente.nombre">Nombre</Translate>
                </Label>
                <AvField id="cliente-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label id="direccionLabel" for="cliente-direccion">
                  <Translate contentKey="gatewayApp.empresaCliente.direccion">Direccion</Translate>
                </Label>
                <AvField id="cliente-direccion" type="text" name="direccion" />
              </AvGroup>
              <AvGroup>
                <Label id="cUILLabel" for="cliente-cUIL">
                  <Translate contentKey="gatewayApp.empresaCliente.cUIL">C UIL</Translate>
                </Label>
                <AvField id="cliente-cUIL" type="string" className="form-control" name="cUIL" />
              </AvGroup>
              <AvGroup>
                <Label id="telefonoLabel" for="cliente-telefono">
                  <Translate contentKey="gatewayApp.empresaCliente.telefono">Telefono</Translate>
                </Label>
                <AvField id="cliente-telefono" type="string" className="form-control" name="telefono" />
              </AvGroup>
              <AvGroup>
                <Label for="cliente-empresa">
                  <Translate contentKey="gatewayApp.empresaCliente.empresa">Empresa</Translate>
                </Label>
                <AvInput id="cliente-empresa" type="select" className="form-control" name="empresa.id">
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
              <Button tag={Link} id="cancel-save" to="/cliente" replace color="info">
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
  clienteEntity: storeState.cliente.entity,
  loading: storeState.cliente.loading,
  updating: storeState.cliente.updating,
  updateSuccess: storeState.cliente.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(ClienteUpdate);
