import React, { Component } from 'react';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import Settings from '../NewJazzFit/Settings';

import {
    Layout,
    Steps,
    Form,
    Input,
    Row,
    Col,
    Button,
    DatePicker,
    Icon,
    message,
    Pagination,
    Divider,
    Radio,
    Typography
  } from "antd";



export default class MyDoc extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    MyDoc1 = () => (
        <Document>
            <Page>
                ///this is the document
                <Settings />
            </Page>
        </Document>
    )

    DownloadPdf = () => {
        console.log('hit download pddf')
        return (
            <div>
                thahkskshk
                <div>
                    <PDFDownloadLink Document={this.MyDoc1} fileName="s2omename.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                    </PDFDownloadLink>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div > 
                
 <Button onClick={this.DownloadPdf}>download pdf</Button>
            </div>
        )
    }
}
