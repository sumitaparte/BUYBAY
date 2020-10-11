
import React, { Component } from "react";
class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="footer" fixed="bottom" style={{backgroundColor:"#777"}}>
        <div className="d-flex justify-content-between" style={{marginLeft:"20px", marginRight:"20px"}}>
          <div className="py-3">
          <section >
             <div >
                 
                     <p>
                         <h2 style={{color:"white"}}>Contact Us</h2>
                     </p>
                     <p style={{color: "white"}}>
                        +902-1234-5678
                     </p>
                     <p style={{color: "white"}}>
                         bubybay@gmail.com
                     </p>
             </div>
         </section>
          </div>
          <div className="py-3">
            <a href="/aboutus" style={{textDecoration:"none"}}>
            <section>
            <div >
                    <p>
                        <h2 style={{color:"white", textDecoration:"underline"}}>About Us</h2>
                    </p>
                    <p>
                        <p  style={{color: "white"}}>Read about the website<br/> and its creators.</p>
                    </p>
            </div>
            
        </section>
        </a>
            
          </div>
          <div className="py-3">
          <a href="/feedback" style={{textDecoration:"none"}} >
          <section >
            <div >
                    <p>
                        <h2 style={{color:"white", textDecoration:"underline"}}>Provide Feedback</h2>
                    </p>
                    <p>
                        <p  style={{color: "white",  textDecoration:"none"}}>Submit your feedback<br/>or any other concerns <br/> regarding the website.</p>
                    </p>
            </div>
        </section>
        </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;// import React, { Component } from "react";

// export default class Footer extends Component {
//   render() {
//     return (
//       <footer className="footer">
//          {/* <p className="mt-3"><a href="/underCons">Abodsfsdut</a> |  <a href="underCons">Contact</a> | <a href="underCons">FAQ</a> | @2020 BuyBay Inc.</p> */}
//          <div className="row">
//           <div className="col-md-1" />
//           <div className="col-md-2" >
//          <section class="bottomlinks">
//             <div class="links">
//                 <ul>
//                     <li>
//                         <h2>Contact Us</h2>
//                     </li>
//                     <li>
//                         <a class="footer-link">+902-1234-5678</a>
//                     </li>
//                     <li>
//                         <a class="footer-link">bubybay@gmail.com</a>
//                     </li>
//                     <li>
//                         <a class="footer-link">Find Our Agent</a>
//                     </li>
//                 </ul> 
//             </div>
//         </section>
//         </div>
//         <div className="col-md-1" />
//         <div className="col-md-3" >
        // <section class="bottomlinks">
        //     <div class="links">
        //         <ul>
        //             <li>
        //                 <h2>About Us</h2>
        //             </li>
        //             <li>
        //                 <a class="footer-link"href="/aboutus" style={{color: "white"}}>Read about the website<br/> and its creators.</a>
        //             </li>
        //         </ul> 
        //     </div>
        // </section>
//         </div>
//         <div className="col-md-1" />
//         <div className="col-md-3" >
        // <section class="bottomlinks">
        //     <div class="links">
        //         <ul>
        //             <li>
        //                 <h2>Provide Feedback</h2>
        //             </li>
        //             <li>
        //                 <a class="footer-link"href="/aboutus" style={{color: "white"}}>Submit your feedback<br/>or any other concerns <br/> regarding the website.</a>
        //             </li>
        //         </ul> 
        //     </div>
        // </section>
//         </div>
//         </div>
//       </footer>
//     );
//   }
// }
