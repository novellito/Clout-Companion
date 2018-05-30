import React, { Fragment } from 'react';
import { Table } from 'react-materialize';

const Bots = () => {
  return (
    <Fragment>
      <p>
        There are various bots out there on the market. The following table
        shows a few popular ones.
      </p>
      <Table responsive="true">
        <thead>
          <tr>
            <th data-field="bot">Bot</th>
            <th data-field="type">Sites Supported</th>
            <th data-field="twitter">Twitter</th>
            <th data-field="website">website</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alan</td>
            <td>$3.76</td>
            <td>
              <a href="">
                <i class="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a href="">
                <i class="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>
              <a href="">
                <i class="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a href="">
                <i class="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Bots;
