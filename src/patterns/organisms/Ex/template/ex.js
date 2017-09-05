this["T"] = this["T"] || {};
this["T"]["tpl"] = this["T"]["tpl"] || {};
this["T"]["tpl"]["ex"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " m-ex--"
    + container.escapeExpression(((helper = (helper = helpers.modifier || (depth0 != null ? depth0.modifier : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"modifier","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return " data-t-decorator=\""
    + container.escapeExpression(((helper = (helper = helpers.decorator || (depth0 != null ? depth0.decorator : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"decorator","hash":{},"data":data}) : helper)))
    + "\"";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["ex.link"],depth0,{"name":"ex.link","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"m-ex"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.modifier : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-t-name=\"Ex\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.decorator : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n	<h2 class=\"m-ex__headline\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n	<ul class=\"js-m-ex__list\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.links : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\r\n	<button class=\"m-ex__button js-m-ex__more\">more links</button>\r\n</div>\r\n";
},"usePartial":true,"useData":true});