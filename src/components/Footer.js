import React from 'react';
import { Col, Row } from 'reactstrap';



const Footer = ({t}) => (
  <footer>
    <Row noGutters className="justify-content-between text-center fs--1 mt-4 mb-3">
      <Col sm="auto">
        <p className="mb-0 text-600">
        {('電統能源模塊機系統')} 
          {/* {t('An Industry Leading Open Source Energy Management System')}  */}
          <span className="d-none d-sm-inline-block">| </span>
          <br className="d-sm-none" /> {  new Date().getFullYear() }&copy; 
            <a href={"https://www.powertankenergy.com/zh-tw/"}>{('Power Tank Energy')}</a>
        </p>
      </Col>
      <Col sm="auto">
        
      </Col>
    </Row>
  </footer>
);

export default Footer;
