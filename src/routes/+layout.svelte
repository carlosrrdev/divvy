<script>
	import "$lib/global.css"
</script>

<header>
	<nav>
		<a href="/">Divvy</a>
		<ul>
			<li>
				<a href="/guest-limitations">Guest limitations</a>
			</li>
			<li>
				<a href="/contact">Contact</a>
			</li>
		</ul>
	</nav>
</header>
<main>
	<slot />
</main>
<footer>
	<p>footer content</p>
</footer>