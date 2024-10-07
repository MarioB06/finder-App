<View style={tw`flex-row justify-between items-center bg-white p-4 shadow`}>
    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={tw`flex-row items-center`}>
        <SvgXml xml={magnifyingGlassSvg} width={30} height={30} />
        <Text style={tw`text-blue-500 text-lg ml-2`}>Finder</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        {/* Hier das Hamburger-Menü einfügen, falls vorhanden */}
    </TouchableOpacity>
</View>