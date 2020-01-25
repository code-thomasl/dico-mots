import React from 'react'
import { Spinner, Card, CardBody, CardImg, CardTitle, CardText, CardSubtitle, Button } from 'reactstrap'
import { useTranslation } from 'react-i18next';


export default function AboutPage() {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>{t('About.2')}</CardTitle>
                    <CardText>{t('About.3')}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}
