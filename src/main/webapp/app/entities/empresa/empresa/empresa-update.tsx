import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './empresa.reducer';
import { IEmpresa } from 'app/shared/model/empresa/empresa.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmpresaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmpresaUpdate = (props: IEmpresaUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { empresaEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/empresa');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...empresaEntity,
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
          <h2 id="gatewayApp.empresaEmpresa.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.empresaEmpresa.home.createOrEditLabel">Create or edit a Empresa</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : empresaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="empresa-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="empresa-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="empresa-nombre">
                  <Translate contentKey="gatewayApp.empresaEmpresa.nombre">Nombre</Translate>
                </Label>
                <AvField id="empresa-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label id="direccionLabel" for="empresa-direccion">
                  <Translate contentKey="gatewayApp.empresaEmpresa.direccion">Direccion</Translate>
                </Label>
                <AvField id="empresa-direccion" type="text" name="direccion" />
              </AvGroup>
              <AvGroup>
                <Label id="cUITLabel" for="empresa-cUIT">
                  <Translate contentKey="gatewayApp.empresaEmpresa.cUIT">C UIT</Translate>
                </Label>
                <AvField id="empresa-cUIT" type="string" className="form-control" name="cUIT" />
              </AvGroup>
              <AvGroup>
                <Label id="telefonoLabel" for="empresa-telefono">
                  <Translate contentKey="gatewayApp.empresaEmpresa.telefono">Telefono</Translate>
                </Label>
                <AvField id="empresa-telefono" type="string" className="form-control" name="telefono" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/empresa" replace color="info">
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
  empresaEntity: storeState.empresa.entity,
  loading: storeState.empresa.loading,
  updating: storeState.empresa.updating,
  updateSuccess: storeState.empresa.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaUpdate);
