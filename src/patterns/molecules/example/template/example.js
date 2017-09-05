this["T"] = this["T"] || {};
this["T"]["tpl"] = this["T"]["tpl"] || {};
this["T"]["tpl"]["example"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " m-example--"
    + container.escapeExpression(((helper = (helper = helpers.modifier || (depth0 != null ? depth0.modifier : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"modifier","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return " data-t-decorator=\""
    + container.escapeExpression(((helper = (helper = helpers.decorator || (depth0 != null ? depth0.decorator : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"decorator","hash":{},"data":data}) : helper)))
    + "\"";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["example.link"],depth0,{"name":"example.link","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"m-example"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.modifier : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-t-name=\"Example\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.decorator : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n  <h2 class=\"m-example__headline\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n  <ul class=\"js-m-example__list\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.links : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </ul>\r\n  <button class=\"m-example__button js-m-example__more\">more links</button>\r\n</div>\r\n";
},"usePartial":true,"useData":true});