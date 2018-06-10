import React, { Fragment } from 'react';
import { Table } from 'react-materialize';

const ProSer = () => {
  return (
    <Fragment>
      <h1 className="section-title">What are Proxies?</h1>
      <p>
        Proxies are essentially different IP addresses for your computer, that
        allow you to buy more than one item during a drop. Most sites only let
        people check out one item so a proxy will make it seem as though you are
        buying from differesnt locations. If you are using a bot without
        proxies, you risk being banned from the website.
      </p>

      <Table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Twitter</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Back Door Proxies</td>
            <td>
              <a
                href="https://twitter.com/BackDoorProxies"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://www.backdoorproxies.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>Ace Proxies</td>
            <td>
              <a
                href="https://twitter.com/AceProxies"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://aceproxies.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>Brazy Kicks Proxies</td>
            <td>
              <a
                href="https://twitter.com/Brazy_Kicks"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="http://www.brazykicks.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>eProxies</td>
            <td>
              <a
                href="https://twitter.com/e_Proxies"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="http://eproxies.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>SNKRS Proxies</td>
            <td>
              <a
                href="https://twitter.com/SNKRSproxies"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://www.snkrsproxies.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
      <h1 className="section-title">What are Servers?</h1>
      <p>
        Servers are other virtual computers that run your bot. The advantage of
        using servers is that speeds are typically faster since it is basically
        a brand new computer dedicated to running only your bot and nothing
        else. Servers also have the benefit of faster network speeds, which is
        crucial during drop days.
      </p>

      <Table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Twitter</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vultr</td>
            <td>
              <a
                href="https://twitter.com/Vultr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://www.vultr.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
          <tr>
            <td>Amazon Web Services</td>
            <td>
              <a
                href="https://twitter.com/awscloud"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-twitter" />
              </a>
            </td>
            <td>
              <a
                href="https://aws.amazon.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-globe" />
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
};

export default ProSer;
