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
            <th data-field="website">Website</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Ghost AIO</td>
            <td>Nike</td>
            <td>
              <a
                href="https://twitter.com/ghostAIO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://ghostaio.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>Dashe IO</td>
            <td>Shopify</td>
            <td>
              <a
                href="https://twitter.com/DasheIO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://dashe.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>Slayer</td>
            <td>Multiple Sites</td>
            <td>
              <a
                href="https://twitter.com/NikeSlayer_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="http://www.nikeslayer.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>AIO Bot</td>
            <td>Multiple Sites</td>
            <td>
              <a
                href="https://twitter.com/ANB_AIO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://www.aiobot.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>SuperCop Bot</td>
            <td>Supreme</td>
            <td>
              <a
                href="https://twitter.com/SuperCopBot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://supercopbot.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>ForceCop</td>
            <td>Supreme</td>
            <td>
              <a
                href="https://twitter.com/ForceCop"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://forcecop.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>Sole Adidas</td>
            <td>Adidas</td>
            <td>
              <a
                href="https://twitter.com/SoleSorcerer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://solesorcerer.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>Ycopp</td>
            <td>Adidas</td>
            <td>
              <a
                href="https://twitter.com/ycopp_com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://www.ycopp.com/?v=79cba1185463"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>TaskBot</td>
            <td>Multiple Sites</td>
            <td>
              <a
                href="https://twitter.com/aiomacbot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://www.aiomacbot.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
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
