import React from 'react'
import {Card, CardBody, CardImg, CardTitle, CardText} from 'reactstrap'
import { useTranslation } from 'react-i18next';
import LogosCardImg from '../../logo_card_img.png'


export default function AboutPage() {
    const { t } = useTranslation();

    return (
        <div>
            <Card>
                <CardBody>
                    <CardImg top src={LogosCardImg} alt="Card image cap" />
                    <CardTitle>{t('About.2')}</CardTitle>                             
                    <CardText>{t('About.3')}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}
