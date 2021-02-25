(this["webpackJsonpback-to-work"]=this["webpackJsonpback-to-work"]||[]).push([[8],{309:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(22),a=n(23),l=function(){function e(){Object(r.a)(this,e)}return Object(a.a)(e,null,[{key:"errorMessage",value:function(e,t,n,r){var a,l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;if(l)return l;if(!r&&!n[e])return null;var c=t[e];return(null===c||void 0===c||null===(a=c[0])||void 0===a?void 0:a.message)||(null===c||void 0===c?void 0:c.message)||c||null}}]),e}()},310:function(e,t,n){"use strict";var r=n(12),a=n(40),l=n(56),c=n(92),o=Object(r.a)([a.a.selectCurrentUser],(function(e){return new l.a(e).match(c.a.values.userRead)})),i=Object(r.a)([a.a.selectCurrentUser],(function(e){return new l.a(e).match(c.a.values.userEdit)})),s=Object(r.a)([a.a.selectCurrentUser],(function(e){return new l.a(e).match(c.a.values.userDestroy)})),u={selectPermissionToRead:o,selectPermissionToEdit:i,selectPermissionToCreate:Object(r.a)([a.a.selectCurrentUser],(function(e){return new l.a(e).match(c.a.values.userCreate)})),selectPermissionToDestroy:s};t.a=u},313:function(e,t,n){"use strict";var r=n(306),a=Object(r.a)("div")({marginTop:"16px",padding:"24px",backgroundColor:"#fff",width:"100%",border:"1px solid #dee2e6 !important",borderRadius:"5px"});t.a=a},314:function(e,t,n){"use strict";var r=n(3),a=(n(0),n(46)),l=n(419),c=n(350),o=n(101);t.a=function(e){return Object(r.jsx)(l.a,{children:e.items.map((function(e){return function(e){return e.length>1}(e)?Object(r.jsx)(c.a,{color:"inherit",component:a.a,to:e[1],children:e[0]},e[0]):Object(r.jsx)(o.a,{color:"textPrimary",children:e[0]},e[0])}))})}},315:function(e,t,n){"use strict";var r=n(306),a=Object(r.a)("h1")({margin:0,marginBottom:"24px",fontSize:"1.75em"});t.a=a},316:function(e,t,n){"use strict";var r=n(3),a=(n(0),n(415)),l=n(303),c=n(309);function o(e){var t=e.label,n=e.name,o=e.hint,i=e.type,s=e.placeholder,u=e.autoFocus,b=e.autoComplete,d=e.required,j=e.externalErrorMessage,f=e.disabled,m=e.endAdornment,O=Object(l.e)(),p=O.register,h=O.errors,x=O.formState,g=x.touched,v=x.isSubmitted,y=c.a.errorMessage(n,h,g,v,j);return Object(r.jsx)(a.a,{id:n,name:n,type:i,label:t,required:d,inputRef:p,onChange:function(t){e.onChange&&e.onChange(t.target.value)},onBlur:function(t){e.onBlur&&e.onBlur(t)},margin:"normal",fullWidth:!0,variant:"outlined",size:"small",placeholder:s||void 0,autoFocus:u||void 0,autoComplete:b||void 0,InputLabelProps:{shrink:!0},error:Boolean(y),helperText:y||o,InputProps:{endAdornment:m},inputProps:{name:n},disabled:f})}o.defaultProps={type:"text",required:!1},t.a=o},323:function(e,t,n){"use strict";var r=n(3),a=(n(0),n(402));t.a=function(){return Object(r.jsx)("div",{style:{width:"100%",marginTop:"24px",marginBottom:"24px",display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"},children:Object(r.jsx)(a.a,{color:"secondary"})})}},324:function(e,t,n){"use strict";var r=n(306),a=Object(r.a)("div")({display:"flex",alignItems:"center",marginBottom:"16px",flexWrap:"wrap","& > *":{marginBottom:"8px",marginRight:"8px"}});t.a=a},330:function(e,t,n){"use strict";var r=n(3),a=n(11),l=(n(0),n(2)),c=n(423);var o=function(e){var t=e.color,n=e.label,a=e.style,o=t?Object(l.a)({backgroundColor:{green:"#28a745",red:"#dc3545",yellow:"#ffc107"}[t],color:{green:"#fff",red:"#fff",yellow:"#fff"}[t]},a):Object(l.a)({},a);return Object(r.jsx)(c.a,{size:"small",style:o,label:n})};t.a=function(e){var t=e.value;return t?"active"===t?Object(r.jsx)(o,{color:"green",label:Object(a.b)("user.status.active")}):"inactive"===t?Object(r.jsx)(o,{color:"red",label:Object(a.b)("user.status.inactive")}):Object(r.jsx)(o,{color:"yellow",label:Object(a.b)("user.status.invited")}):null}},413:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n(0),l=n(11),c=n(313),o=n(314),i=n(315),s=n(2),u=n(115),b=n(398),d=n(399),j=n(349),f=n(286),m=n(322),O=n.n(m),p=n(368),h=n.n(p),x=n(303),g=n(21),v=n(121),y=n(81),C=n.n(y),P={generic:function(e){return v.c().label(e)},string:function(e){return v.g().transform((function(e,t){return""===t?null:e})).nullable(!0).trim().label(e)},stringArray:function(e){return v.a().compact().ensure().of(v.g().transform((function(e,t){return""===t?null:e})).trim()).label(e).transform((function(e,t){return t?Array.isArray(t)?t:[t]:t}))},boolean:function(e){return v.b().nullable(!0).label(e)},relationToOne:function(e){return v.c().label(e).transform((function(e,t){return t?t.id:null}))},relationToMany:function(e){return v.c().label(e).transform((function(e,t){return t&&t.length?t.map((function(e){return e.id})):[]}))},json:function(e){return v.c().label(e)},integer:function(e){return v.d().transform((function(e,t){return""===t?null:e})).integer().nullable(!0).label(e)},integerRange:function(e){return v.c().label(e)},enumerator:function(e){return v.g().transform((function(e,t){return""===t?null:e})).label(e).nullable(!0)},email:function(e){return v.g().transform((function(e,t){return""===t?null:e})).nullable(!0).trim().label(e)},decimal:function(e){return v.d().transform((function(e,t){return""===t?null:e})).nullable(!0).label(e)},decimalRange:function(e){return v.a().ensure().compact().of(v.d().transform((function(e,t){return""===t?null:e})).nullable(!0).label(e)).label(e)},datetime:function(e){return v.c().nullable(!0).label(e).transform((function(e,t){return t?C()(t,"YYYY-MM-DD HH:mm").toISOString():null}))},datetimeRange:function(e){return v.c().label(e)},date:function(e){return v.c().nullable(!0).label(e).test("is-date",Object(l.b)("validation.mixed.default"),(function(e){return!e||C()(e,"YYYY-MM-DD").isValid()}))},dateRange:function(e){return v.a().ensure().compact().of(v.c().nullable(!0).label(e).test("is-date",Object(l.b)("validation.mixed.default"),(function(e){return!e||C()(e,"YYYY-MM-DD").isValid()})).transform((function(e){return e?C()(e).format("YYYY-MM-DD"):null}))).label(e)}},w=n(28),S=n(59),R=n(124),k={status:["active","invited","empty-permissions"],roles:Object.keys(R.a.values)},T=n(316),M=n(379),z=n(53),N=n(66),Y=n(6),D=n(27),I=n(101),B=n(415),F=n(167),V=n(423),A=n(291),E=n(351),W=n.n(E);function q(e){var t=e.inputRef,n=Object(N.a)(e,["inputRef"]);return Object(r.jsx)("div",Object(s.a)({ref:t},n))}var L={Control:function(e){var t=e.children,n=e.innerProps,a=e.innerRef,l=e.selectProps,c=l.classes,o=l.TextFieldProps;return Object(r.jsx)(B.a,Object(s.a)({InputProps:{inputComponent:q,inputProps:Object(s.a)({className:c.input,ref:a,children:t},n)}},o))},Menu:function(e){return Object(r.jsx)(F.a,Object(s.a)(Object(s.a)({square:!0,className:e.selectProps.classes.paper},e.innerProps),{},{children:e.children}))},MultiValue:function(e){return Object(r.jsx)(V.a,{tabIndex:-1,label:e.children,className:Object(Y.a)(e.selectProps.classes.chip,Object(z.a)({},e.selectProps.classes.chipFocused,e.isFocused)),onDelete:e.removeProps.onClick,deleteIcon:Object(r.jsx)(W.a,Object(s.a)({},e.removeProps)),size:"small"})},NoOptionsMessage:function(e){return Object(r.jsx)(I.a,Object(s.a)(Object(s.a)({color:"textSecondary",className:e.selectProps.classes.noOptionsMessage},e.innerProps),{},{children:e.children}))},Option:function(e){return Object(r.jsx)(A.a,Object(s.a)(Object(s.a)({ref:e.innerRef,selected:e.isFocused,component:"div",style:{fontWeight:e.isSelected?500:400}},e.innerProps),{},{children:e.children}))},Placeholder:function(e){var t=e.selectProps,n=e.innerProps,a=void 0===n?{}:n,l=e.children;return Object(r.jsx)(I.a,Object(s.a)(Object(s.a)({color:"textSecondary",className:t.classes.placeholder},a),{},{children:l}))},SingleValue:function(e){return Object(r.jsx)(I.a,Object(s.a)(Object(s.a)({className:e.selectProps.classes.singleValue},e.innerProps),{},{children:e.children}))},ValueContainer:function(e){return Object(r.jsx)("div",{className:e.selectProps.classes.valueContainer,children:e.children})}},H=n(284),U=n(309),J=Object(H.a)((function(e){return{root:{flexGrow:1,height:250,minWidth:290,fontSize:14},input:{display:"flex",padding:0,height:"auto",minHeight:"40px"},valueContainer:{display:"flex",flexWrap:"wrap",flex:1,alignItems:"center",overflow:"hidden",paddingLeft:e.spacing(1)},chip:{margin:e.spacing(.5,.25)},chipFocused:{backgroundColor:Object(D.b)("light"===e.palette.type?e.palette.grey[300]:e.palette.grey[700],.08)},noOptionsMessage:{padding:e.spacing(1,2)},singleValue:{fontSize:14},placeholder:{position:"absolute",left:2,bottom:6,fontSize:14},paper:{position:"absolute",zIndex:2,marginTop:e.spacing(1),left:0,right:0},divider:{height:e.spacing(2)}}}));function K(e){var t=e.label,n=e.name,c=e.hint,o=e.options,i=e.required,u=e.mode,b=e.placeholder,d=e.isClearable,j=e.externalErrorMessage,f=Object(x.e)(),m=f.register,O=f.errors,p=f.formState,h=p.touched,g=p.isSubmitted,v=f.setValue,y=f.watch,C=U.a.errorMessage(n,O,h,g,j),P=y(n);Object(a.useEffect)((function(){m({name:n})}),[m,n]);var w=function(){return P?P.map((function(e){return o.find((function(t){return t.value===e}))})):[]},S=function(){var t=e.options;return null!=P?t.find((function(e){return e.value===P})):null},R=function(t){if(!t)return v(n,[],{shouldValidate:!0}),void(e.onChange&&e.onChange([]));var r=t.map((function(e){return e?e.value:e})).filter((function(e){return null!=e}));v(n,r,{shouldValidate:!0}),e.onChange&&e.onChange(r)},k=function(t){if(!t)return v(n,null,{shouldValidate:!0}),void(e.onChange&&e.onChange(null));v(n,t.value,{shouldValidate:!0}),e.onChange&&e.onChange(t.value)},T=J(),z={container:function(e){return Object(s.a)(Object(s.a)({},e),{},{width:"100%",marginTop:"16px",marginBottom:"8px"})},control:function(e){return Object(s.a)(Object(s.a)({},e),{},{borderColor:C?"red":void 0})}};return Object(r.jsx)(M.a,{styles:z,classes:T,value:"multiple"===e.mode?w():S(),onChange:function(t){return"multiple"===e.mode?R(t):k(t)},inputId:n,TextFieldProps:{label:t,required:i,variant:"outlined",fullWidth:!0,size:"small",error:Boolean(C),helperText:C||c,InputLabelProps:{shrink:!0}},components:L,onBlur:function(t){e.onBlur&&e.onBlur(t)},options:o,isMulti:"multiple"===u,placeholder:b||"",isClearable:d,loadingMessage:function(){return Object(l.b)("autocomplete.loading")},noOptionsMessage:function(){return Object(l.b)("autocomplete.noOptions")}})}K.defaultProps={required:!1,isClearable:!0};var G=K,X=n(306),$=Object(X.a)("div")({marginBottom:"16px","& form":{width:"100%"}}),Q=Object(X.a)("div")({paddingTop:"16px",textAlign:"right","& > *":{marginLeft:"8px",marginBottom:"8px"}}),Z=$,_=n(336),ee=n(367),te=n.n(ee);function ne(e,t){return e?t?Number(e).toFixed(t):Number(e):null}function re(e){return e?C()(e).format("YYYY-MM-DD"):null}function ae(e){return e?C()(e).format("YYYY-MM-DD HH:mm"):null}var le={enumerator:function(e){return function(t){return t?Object(l.b)("".concat(e,".").concat(t)):null}},generic:function(){return function(e){return e}},stringArray:function(){return function(e){return(e||[]).join(" ")}},json:function(){return function(e){return e?JSON.stringify(e,null,2):null}},decimal:function(e){return function(t){return ne(t,e)}},boolean:function(e,t){return function(n){return null==n?null:Boolean(n)?e||Object(l.b)("common.yes"):t||Object(l.b)("common.no")}},relationToOne:function(){return function(e){return e&&e.label||null}},relationToMany:function(){return function(e){return(e||[]).map((function(e){return e.label})).join(" ")}},filesOrImages:function(){return function(e){return(e||[]).map((function(e){return e.downloadUrl})).join(" ")}},date:function(){return function(e){return re(e)}},dateRange:function(){return function(e){if(!e||!e.length)return null;var t=e[0],n=2===e.length&&e[1];return t||n?t&&!n?"> ".concat(re(t)):!t&&n?"< ".concat(re(n)):"".concat(re(t)," - ").concat(re(n)):null}},datetime:function(){return function(e){return ae(e)}},datetimeRange:function(){return function(e){if(!e||!e.length)return null;var t=e[0],n=2===e.length&&e[1];return t||n?t&&!n?"> ".concat(ae(t)):!t&&n?"< ".concat(ae(n)):"".concat(ae(t)," - ").concat(ae(n)):null}},decimalRange:function(e){return function(t){if(!t||!t.length)return null;var n=t[0],r=2===t.length&&t[1];return null==n&&null==r?null:null!=n&&null==r?"> ".concat(ne(n,e)):null==n&&null!=r?"< ".concat(ne(r,e)):"".concat(ne(n,e)," - ").concat(ne(r,e))}},range:function(){return function(e){if(!e||!e.length)return null;var t=e[0],n=2===e.length&&e[1];return null!=t&&""!==t||null!=n&&""!==n?null==t||null!=n&&""!==n?null!=t&&""!==t||null==n?"".concat(t," - ").concat(n):"< ".concat(n):"> ".concat(t):null}}},ce=Object(H.a)((function(e){return{root:{display:"flex",alignItems:"center"},values:{marginLeft:8,display:"flex",justifyContent:"flex-start",flexWrap:"wrap","& > *":{margin:e.spacing(.5)}}}}));function oe(e){var t=ce(),n=e.values,a=e.renders,c=Object.keys(n||{}).map((function(e){return{label:a[e].label,value:a[e].render(n[e])}})).filter((function(e){return e.value||0===e.value||!1===e.value}));return!c.length||e.expanded?Object(l.b)("common.filters"):Object(r.jsxs)("div",{className:t.root,children:[Object(l.b)("common.filters"),":",Object(r.jsx)("span",{className:t.values,children:c.map((function(e){return Object(r.jsx)(V.a,{size:"small",label:"".concat(e.label,": ").concat(e.value)},e.label)}))})]})}var ie=n(8),se=n(424),ue=Object(ie.a)({root:{border:"1px solid rgba(0, 0, 0, .125)",boxShadow:"none","&:not(:last-child)":{borderBottom:0},"&:before":{display:"none"},"&$expanded":{margin:"auto"}},expanded:{}})(se.a),be=v.e().shape({fullName:P.string(Object(l.b)("user.fields.fullName")),email:P.email(Object(l.b)("user.fields.email")),role:P.enumerator(Object(l.b)("user.fields.role")),status:P.enumerator(Object(l.b)("user.fields.status"))}),de={fullName:{label:Object(l.b)("user.fields.fullName"),render:le.generic()},email:{label:Object(l.b)("user.fields.email"),render:le.generic()},role:{label:Object(l.b)("user.fields.role"),render:function(e){return e?Object(l.b)("roles.".concat(e,".label")):null}},status:{label:Object(l.b)("user.fields.status"),render:le.enumerator("user.status")}},je={fullName:null,email:null,role:null,status:null};var fe=function(e){var t=Object(g.e)(S.a.selectRawFilter),n=Object(g.d)(),c=Object(a.useState)(!1),o=Object(u.a)(c,2),i=o[0],m=o[1],p=Object(a.useState)((function(){return Object(s.a)(Object(s.a)({},je),t)})),v=Object(u.a)(p,1)[0],y=Object(x.d)({resolver:Object(_.a)(be),defaultValues:v,mode:"all"});Object(a.useEffect)((function(){n(w.a.doFetch(be.cast(v),t))}),[n]);var C=e.loading;return Object(r.jsx)(Z,{children:Object(r.jsxs)(ue,{expanded:i,onChange:function(e,t){return m(t)},children:[Object(r.jsx)(b.a,{expandIcon:Object(r.jsx)(te.a,{}),children:Object(r.jsx)(oe,{values:t,renders:de,expanded:i})}),Object(r.jsx)(d.a,{children:Object(r.jsx)(x.a,Object(s.a)(Object(s.a)({},y),{},{children:Object(r.jsxs)("form",{onSubmit:y.handleSubmit((function(e){var t=y.getValues();n(w.a.doFetch(e,t)),m(!1)})),children:[Object(r.jsxs)(j.a,{container:!0,spacing:2,children:[Object(r.jsx)(j.a,{item:!0,lg:6,xs:12,children:Object(r.jsx)(T.a,{name:"email",label:Object(l.b)("user.fields.email")})}),Object(r.jsx)(j.a,{item:!0,lg:6,xs:12,children:Object(r.jsx)(T.a,{name:"fullName",label:Object(l.b)("user.fields.fullName")})}),Object(r.jsx)(j.a,{item:!0,lg:6,xs:12,children:Object(r.jsx)(G,{name:"role",label:Object(l.b)("user.fields.role"),options:k.roles.map((function(e){return{value:e,label:Object(l.b)("roles.".concat(e,".label"))}}))})}),Object(r.jsx)(j.a,{item:!0,lg:6,xs:12,children:Object(r.jsx)(G,{name:"status",label:Object(l.b)("user.fields.status"),options:k.status.map((function(e){return{value:e,label:Object(l.b)("user.status.".concat(e))}}))})})]}),Object(r.jsxs)(Q,{children:[Object(r.jsx)(f.a,{variant:"contained",color:"primary",type:"submit",disabled:C,startIcon:Object(r.jsx)(O.a,{}),size:"small",children:Object(l.b)("common.search")}),Object(r.jsx)(f.a,{type:"button",onClick:function(){Object.keys(je).forEach((function(e){y.setValue(e,je[e])})),n(w.a.doReset()),m(!1)},disabled:C,startIcon:Object(r.jsx)(h.a,{}),size:"small",children:Object(l.b)("common.reset")})]})]})}))})]})})},me=n(310),Oe=n(46),pe=Object(X.a)("div")({display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"8px",overflow:"hidden"}),he=n(36),xe=n(400),ge=n(418);var ve=function(e){var t=Object(he.a)(),n=e.pagination,a=n.current,c=n.pageSize,o=n.total,i=e.labelDisplayedRows||function(e){var t=e.from,n=e.to,r=e.count;return Object(l.b)("pagination.labelDisplayedRows",t,n,r)},s=Object(xe.a)(t.breakpoints.up("sm"));return Object(r.jsx)(pe,{children:Object(r.jsx)(ge.a,{labelDisplayedRows:i,labelRowsPerPage:s?Object(l.b)("pagination.labelRowsPerPage"):"",rowsPerPageOptions:[10,20,30,40],component:"div",count:o,rowsPerPage:Number(c),page:a-1,onChangePage:function(t,n){var r=Number(e.pagination.pageSize||10);e.onChange({current:n+1,pageSize:r})},onChangeRowsPerPage:function(t){return function(t){e.onChange({current:1,pageSize:t||10})}(+t.target.value)}})})},ye=n(323),Ce=n(380),Pe=n(301),we=n(417),Se=n(294),Re=n(406),ke=n(409),Te=n(401),Me=n(407),ze=n(408),Ne=n(426),Ye=n(338),De=n.n(Ye),Ie=n(339),Be=n.n(Ie),Fe=n(425);var Ve=function(e){var t=e.sorter,n=e.onSort,a=e.name,l=e.label,c=e.hasRows,o=e.children,i=e.size,u=void 0===i?"auto":i,b=e.align,d=void 0===b?"left":b,j=Object(N.a)(e,["sorter","onSort","name","label","hasRows","children","size","align"]),f={auto:{},sm:{width:"80px"},md:{width:"180px"}}[u]||{};return c&&n?Object(r.jsx)(Te.a,{style:f,sortDirection:t.field===a&&t.order,align:d,children:Object(r.jsx)(Fe.a,{active:t.field===a,direction:t.order,onClick:function(){return n(a)},children:o||l||""})},a):Object(r.jsx)(Te.a,Object(s.a)(Object(s.a)({align:d,style:f},j),{},{children:o||l||""}))},Ae=n(10),Ee=n.n(Ae),We=n(403),qe=n(404),Le=n(405);var He=function(e){return Ee.a.createPortal(Object(r.jsxs)(We.a,{open:!0,onClose:e.onClose,maxWidth:"xs",fullWidth:!0,children:[Object(r.jsx)(qe.a,{children:e.title}),Object(r.jsxs)(Le.a,{children:[Object(r.jsx)(f.a,{onClick:e.onClose,color:"primary",size:"small",children:e.cancelText}),Object(r.jsx)(f.a,{onClick:e.onConfirm,color:"primary",size:"small",autoFocus:!0,children:e.okText})]})]}),document.getElementById("modal-root"))},Ue=n(330);var Je=function(){var e=Object(g.d)(),t=Object(a.useState)(null),n=Object(u.a)(t,2),c=n[0],o=n[1],i=Object(g.e)(S.a.selectLoading),s=Object(g.e)(S.a.selectRows),b=Object(g.e)(S.a.selectPagination),d=Object(g.e)(S.a.selectSelectedKeys),j=Object(g.e)(S.a.selectHasRows),f=Object(g.e)(S.a.selectSorter),m=Object(g.e)(S.a.selectIsAllSelected),p=Object(g.e)(me.a.selectPermissionToEdit),h=Object(g.e)(me.a.selectPermissionToDestroy),x=function(t){var n=f.field===t&&"asc"===f.order?"desc":"asc";e(w.a.doChangeSort({field:t,order:n}))};return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(Ce.a,{style:{display:"block",width:"100%",overflowX:"auto"},children:Object(r.jsxs)(Re.a,{style:{borderRadius:"5px",border:"1px solid rgb(224, 224, 224)",borderCollapse:"initial"},children:[Object(r.jsx)(Me.a,{children:Object(r.jsxs)(ze.a,{children:[Object(r.jsx)(Ve,{padding:"checkbox",children:j&&Object(r.jsx)(we.a,{checked:Boolean(m),onChange:function(){e(w.a.doToggleAllSelected())},size:"small"})}),Object(r.jsx)(Ve,{children:Object(l.b)("user.fields.avatars")}),Object(r.jsx)(Ve,{onSort:x,hasRows:j,sorter:f,name:"email",label:Object(l.b)("user.fields.email")}),Object(r.jsx)(Ve,{onSort:x,hasRows:j,sorter:f,name:"fullName",label:Object(l.b)("user.fields.fullName")}),Object(r.jsx)(Ve,{children:Object(l.b)("user.fields.roles")}),Object(r.jsx)(Ve,{children:Object(l.b)("user.fields.status")}),Object(r.jsx)(Ve,{size:"md"})]})}),Object(r.jsxs)(ke.a,{children:[i&&Object(r.jsx)(ze.a,{children:Object(r.jsx)(Te.a,{colSpan:100,children:Object(r.jsx)(ye.a,{})})}),!i&&!j&&Object(r.jsx)(ze.a,{children:Object(r.jsx)(Te.a,{colSpan:100,children:Object(r.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:Object(l.b)("table.noData")})})}),!i&&s.map((function(t){return Object(r.jsxs)(ze.a,{children:[Object(r.jsx)(Te.a,{padding:"checkbox",children:Object(r.jsx)(we.a,{checked:d.includes(t.id),onChange:function(){return n=t.id,void e(w.a.doToggleOneSelected(n));var n},size:"small"})}),Object(r.jsx)(Te.a,{children:Object(r.jsx)(Pe.a,{src:t.avatars&&t.avatars.length?t.avatars[0].downloadUrl:void 0,alt:"avatar"})}),Object(r.jsx)(Te.a,{children:t.email}),Object(r.jsx)(Te.a,{children:t.fullName}),Object(r.jsx)(Te.a,{children:t.roles.map((function(e){return Object(r.jsx)("div",{children:Object(r.jsx)("span",{children:R.a.labelOf(e.name)})},e.id)}))}),Object(r.jsx)(Te.a,{children:Object(r.jsx)(Ue.a,{value:t.status})}),Object(r.jsx)(Te.a,{children:Object(r.jsxs)(Ce.a,{display:"flex",justifyContent:"flex-end",children:[Object(r.jsx)(Ne.a,{title:Object(l.b)("common.view"),children:Object(r.jsx)(Se.a,{component:Oe.a,color:"primary",to:"/user/".concat(t.id),children:Object(r.jsx)(O.a,{})})}),p&&Object(r.jsx)(Ne.a,{title:Object(l.b)("common.edit"),children:Object(r.jsx)(Se.a,{color:"primary",component:Oe.a,to:"/user/".concat(t.id,"/edit"),children:Object(r.jsx)(De.a,{})})}),h&&Object(r.jsx)(Ne.a,{title:Object(l.b)("common.destroy"),children:Object(r.jsx)(Se.a,{color:"primary",onClick:function(){return o(t.id)},children:Object(r.jsx)(Be.a,{})})})]})})]},t.id)}))]})]})}),Object(r.jsx)(ve,{onChange:function(t){e(w.a.doChangePagination(t))},disabled:i,pagination:b}),c&&Object(r.jsx)(He,{title:Object(l.b)("common.areYouSure"),onConfirm:function(){return t=c,o(null),void e(w.a.doDestroy(t));var t},onClose:function(){return o(null)},okText:Object(l.b)("common.yes"),cancelText:Object(l.b)("common.no")})]})},Ke=n(370),Ge=n.n(Ke),Xe=n(324);var $e=function(e){var t=Object(g.d)(),n=Object(g.e)(me.a.selectPermissionToCreate),a=Object(g.e)(me.a.selectPermissionToDestroy),c=Object(g.e)(S.a.selectLoading),o=Object(g.e)(S.a.selectSelectedKeys),i=function(){t(w.a.doDestroyAllSelected())};return Object(r.jsxs)(Xe.a,{children:[n&&Object(r.jsx)(f.a,{variant:"contained",color:"primary",component:Oe.a,to:"/user/new",startIcon:Object(r.jsx)(Ge.a,{}),size:"small",children:Object(l.b)("user.invite")}),function(){if(!a)return null;var e=!o.length||c,t=Object(r.jsx)(f.a,{variant:"contained",color:"primary",type:"button",disabled:e,onClick:i,startIcon:Object(r.jsx)(Be.a,{}),size:"small",children:Object(l.b)("common.destroy")});return e?Object(r.jsx)(Ne.a,{title:Object(l.b)("common.mustSelectARow"),children:Object(r.jsx)("span",{children:t})}):t}()]})};t.default=function(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(o.a,{items:[[Object(l.b)("dashboard.menu"),"/"],[Object(l.b)("user.menu")]]}),Object(r.jsxs)(c.a,{children:[Object(r.jsx)(i.a,{children:Object(l.b)("user.title")}),Object(r.jsx)($e,{}),Object(r.jsx)(fe,{}),Object(r.jsx)(Je,{})]})]})}}}]);
//# sourceMappingURL=8.1cc7546a.chunk.js.map